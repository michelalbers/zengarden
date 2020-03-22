import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB8FFgrae3F1-nTm5mTliBZr5fBIQLifP0",
    authDomain: "zengarden-d1e9d.firebaseapp.com",
    databaseURL: "https://zengarden-d1e9d.firebaseio.com",
    projectId: "zengarden-d1e9d",
    storageBucket: "zengarden-d1e9d.appspot.com",
    messagingSenderId: "737421557251",
    appId: "1:737421557251:web:ceb4056ddef983c42b1836",
    measurementId: "G-3NPYLX4MW9"
};

firebase.initializeApp(config);
firebase.firestore();
firebase.analytics();

export default firebase;
