import React, { useState } from 'react';
import { Icon, Button, ButtonDesign } from '@ui5/webcomponents-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import firebase from './firebase';

export const VideoCallScreen: React.FC = () => {
    const videoCallerRef = React.useRef<HTMLVideoElement>();
    const videoCalleeRef = React.useRef<HTMLVideoElement>();
    const { participantType } = useParams();
    const [userMediaStream, setUserMediaStream] = React.useState<MediaStream>();
    const [patientsWaiting, setPatientsWaiting] = React.useState(0);
    const peerConnection = React.useRef<RTCPeerConnection>();
    const [loading, setLoading] = React.useState(false);
    const [inQueue, setInQueue] = React.useState(false);
    const [isConnected, setIsConnected] = React.useState(false);
    const cleanUpFunc = React.useRef<() => void>();
    const localIceCandidateQueue = React.useRef<string[]>([]);
    const [Mute, setMute] = useState<boolean>(true);

    const wartezimmer = React.useRef<firebase.firestore.CollectionReference>(firebase.firestore().collection('wartezimmer'));

    React.useEffect(() => {
        if (!videoCalleeRef.current) return;
        videoCalleeRef.current.muted = Mute;
    }, [Mute]);

    // Listen to new patients, cleanup on unmount
    React.useEffect(() => {

        const cancelWartezimmerSubscription = wartezimmer.current.where('waiting', '==', true).onSnapshot(snapshot => {
            setPatientsWaiting(snapshot.docs.length);
        });

        return () => {
            cancelWartezimmerSubscription();
            console.log('leaving');
            if (peerConnection.current) {
                peerConnection.current.close();
                peerConnection.current = undefined;
            }

            if (cleanUpFunc.current) {
                cleanUpFunc.current();
                cleanUpFunc.current = undefined;
            }
        }
    }, []);


    // Start local video, as soon as video element is ready
    React.useEffect(() => {
        let didCancel = false;
        if (!videoCallerRef) return;
        async function startLocalVideo() {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            if (!videoCallerRef.current || didCancel) return;
            videoCallerRef.current.srcObject = mediaStream;
            setUserMediaStream(mediaStream);
        }
        startLocalVideo();
        return () => {
            didCancel = true;
        };
    }, [videoCallerRef]);

    const setupPeerConnection = () => {
        if (!userMediaStream) return;

        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = undefined;
        }

        if (cleanUpFunc.current) {
            cleanUpFunc.current();
            cleanUpFunc.current = undefined;
        }

        localIceCandidateQueue.current = [];

        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                {
                    urls: [
                        'turn:95.217.2.80:3478',
                    ],
                    username: 'turn',
                    credential: 'server',
                },
            ],
        });

        pc.onicecandidateerror = ev => {
            console.log(ev.errorCode, ev.errorText);
        };

        userMediaStream.getTracks().forEach(t => {
            pc.addTrack(t, userMediaStream);
        });

        peerConnection.current = pc;
    };

    const addPatientToQueue = async () => {
        setLoading(true);
        try {
            // Create a new patient doc
            const patientDoc = wartezimmer.current.doc();

            // Create a fresh peer connection instance
            setupPeerConnection();
            if (!peerConnection.current) throw new Error('RTC Peer connection could not be created');

            // Send local ice candidate to firestore
            peerConnection.current.onicecandidate = ev => {
                if (!ev.candidate) return;
                console.log(`Got new local ICE candidate: ${JSON.stringify(ev.candidate)}`);
                patientDoc.collection('patientCandidates').add({
                    candidate: JSON.stringify(ev.candidate),
                });
            };

            // Remove the patient object when hanging up or closing the connection
            peerConnection.current.oniceconnectionstatechange = ev => {
                switch (peerConnection.current?.iceConnectionState) {
                    case 'connected': {
                        setIsConnected(true);
                        break;
                    }
                    case 'failed': {
                        // TODO: Display error message
                    }
                    case 'closed':
                    case 'disconnected': {
                        patientDoc.delete();
                        setIsConnected(false);
                        setInQueue(false);
                        break;
                    }
                }
            };

            // Create the sdp offer
            const offer = await peerConnection.current?.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });

            // Set the local description to that offer
            await peerConnection.current.setLocalDescription(offer);

            // Send the sdp offer
            await patientDoc.set({
                waiting: true,
                createdAt: new Date().getTime(),
                sdpOffer: offer.sdp,
            });

            // Register the on track event for displaying the remote stream
            peerConnection.current.ontrack = ev => {
                const remoteStream = new MediaStream();
                if (!ev.streams[0]) return;
                ev.streams[0].getTracks().forEach(t => remoteStream.addTrack(t));
                if (videoCalleeRef.current) {
                    videoCalleeRef.current.srcObject = remoteStream;
                }
            };

            // React on remote sdp answer
            const cleanupPatientUpdates = patientDoc.onSnapshot(async snapshot => {
                const patientDocData = snapshot.data() as any;
                if (patientDocData?.sdpAnswer && !peerConnection.current?.remoteDescription) {
                    await peerConnection.current?.setRemoteDescription(
                        new RTCSessionDescription({
                            sdp: patientDocData.sdpAnswer,
                            type: 'answer',
                        }),
                    );
                    while (localIceCandidateQueue.current.length) {
                        const candidate = localIceCandidateQueue.current.shift() as string;
                        await peerConnection.current?.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
                        console.log('added from local queue');
                    }
                }
            });

            // React on remote ice candidates
            const cleanupCandidateUpdates = patientDoc.collection('docCandidates').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(async change => {
                    if (change.type === 'added') {
                        const data = change.doc.data();
                        console.log(`Received Remote Doc Candidate ${data.candidate}`);
                        if (peerConnection.current?.remoteDescription) {
                            await peerConnection.current?.addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)));
                            console.log('added to peer connection');
                        } else {
                            console.log('added to local queue');
                            localIceCandidateQueue.current.push(data.candidate);
                        }
                    }
                });
            });

            // Set the cleanup function
            cleanUpFunc.current = () => {
                cleanupCandidateUpdates();
                cleanupPatientUpdates();
            };

            // Tell the patient she or he is waiting in line
            setInQueue(true);
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    const pickPatientFromQueue = async () => {
        setLoading(true);

        // Grab the oldest patient
        // TODO: filter waiting: true
        const patientQueryResult = await wartezimmer.current
            .where('waiting', '==', true)
            .orderBy('createdAt', 'desc')
            .limitToLast(1)
            .get();
        const patientDoc = patientQueryResult.docs[0];

        try {
            // Create a fresh peer connection instance
            setupPeerConnection();
            if (!peerConnection.current) throw new Error('Error while setting up peer connection');

            // Remove the patient object when hanging up or closing the connection
            peerConnection.current.oniceconnectionstatechange = ev => {
                switch (peerConnection.current?.iceConnectionState) {
                    case 'connected': {
                        setIsConnected(true);
                        break;
                    }
                    case 'failed': {
                        // TODO: Display error message
                    }
                    case 'closed':
                    case 'disconnected': {
                        patientDoc.ref.delete();
                        setIsConnected(false);
                        break;
                    }
                }
            };

            // Register the on track event to display remote streams
            peerConnection.current.ontrack = ev => {
                const remoteStream = new MediaStream();
                if (!ev.streams[0]) return;
                ev.streams[0].getTracks().forEach(t => remoteStream.addTrack(t));
                if (videoCalleeRef.current) {
                    videoCalleeRef.current.srcObject = remoteStream;
                }
            };

            // Send local ice candidates to patient
            peerConnection.current.onicecandidate = ev => {
                if (!ev.candidate) return;
                patientDoc.ref
                    .collection('docCandidates')
                    .add({
                        candidate: JSON.stringify(ev.candidate),
                    })
                    .then(() => {
                        console.log(`Added ${ev.candidate?.candidate}`);
                    })
                    .catch(err => console.log(err));
            };

            // Set remote description to patients sdp offer
            const { sdpOffer } = patientDoc.data();
            await peerConnection.current?.setRemoteDescription(new RTCSessionDescription({ sdp: sdpOffer, type: 'offer' }));

            // Add existing remote ice candidates to the connection
            const patientCandidatesCollection = patientDoc.ref.collection('patientCandidates');
            const existingCandidates = await patientCandidatesCollection.get();
            await Promise.all(
                existingCandidates.docs.map(async candidateDoc => {
                    const { candidate } = candidateDoc.data();
                    await peerConnection.current?.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
                }),
            );

            // Create the sdp answer
            const answer = await peerConnection.current?.createAnswer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });

            // Set the local description to that answer
            await peerConnection.current.setLocalDescription(answer);

            // Send the answer to the patient
            await patientDoc.ref.update({
                sdpAnswer: answer?.sdp,
                waiting: false,
            });
        } catch (err) {
            alert(err);
            patientDoc?.ref?.delete?.();
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'white',
                        height: '280px',
                        width: '200px',
                        borderRadius: '10px',
                        position: 'relative',
                        overflow: 'hidden',
                        alignSelf: 'center',
                    }}
                >
                    <video
                        style={{ height: '280px', width: '200px', backgroundColor: 'grey' }}
                        playsInline
                        controls
                        muted
                        autoPlay
                        ref={videoCalleeRef as any}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            width: '75px',
                            height: '75px',
                            borderRadius: '75px',
                            overflow: 'hidden',
                            bottom: '10px',
                            right: '10px',
                        }}
                    >
                        <video style={{ height: '75px', width: '75px' }} playsInline controls muted autoPlay ref={videoCallerRef as any} />
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    {userMediaStream && isConnected && (
                        <div>
                            <div
                                style={{
                                    marginTop: '20px',
                                    padding: '10px', backgroundColor: !Mute ? 'green' : 'red',
                                    width: '60px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setMute(m => !m)}
                            >
                                Sound
                            </div>
                            <Link to={participantType === 'supporter' ? '/diagnose' : '/endcall'}>
                                <div
                                    style={{
                                        marginTop: '20px',
                                        marginLeft: '20px',
                                        padding: '10px',
                                        backgroundColor: 'red',
                                        width: '60px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Auflegen
                                </div>
                            </Link>
                        </div>
                    )}
                    {userMediaStream &&
                        (participantType === 'supporter' ? (
                            patientsWaiting >= 1 && (
                                <Button
                                    onClick={pickPatientFromQueue}
                                    style={{
                                        backgroundColor: 'green',
                                        borderColor: 'green',
                                        color: 'white',
                                        marginTop: '20px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    Nächsten Patient aufrufen
                                </Button>
                            )
                        ) : !isConnected ? (
                            <Button
                                design={ButtonDesign.Accept}
                                onClick={addPatientToQueue}
                                style={{ 'backgroundColor': '#0b4214', 'color': 'white', 'fontWeight': 'bold', 'marginTop': '15px' }}

                            >
                                {inQueue ? 'Warten auf Supporter:in ...' : 'Mit Supporter:in verbinden'}
                            </Button>
                        ) : null)}

                    {isConnected && (
                        <div style={{ height: '30px', overflow: 'hidden', marginTop: '10px' }}>
                            <p style={{ color: 'white', fontSize: '14px' }}>
                                {Mute ? 'Sie sind stumm geschaltet' : ' '}
                            </p>
                        </div>
                    )}
                    {!isConnected ? (
                        participantType === 'supporter' ? (
                            <h5 style={{ color: 'white' }}>
                                Es warten gerade {patientsWaiting} Patienten
                            </h5>
                        ) : (
                                <h4 style={{ color: 'white' }}>
                                    {patientsWaiting > 1 ? `Es warten gerade ${patientsWaiting} Patienten` : 'Sie sind der nächste Patient'}
                                </h4>
                            )
                    ) : (
                            <h4 style={{ color: 'white' }}>
                                Patientengespräch verbunden
                        </h4>
                        )}
                </div>
            </div>
        </>
    );
};

export default VideoCallScreen;
