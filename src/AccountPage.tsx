import React from 'react';

import { ObjectPage, Button, Icon, Card, List, StandardListItem, Badge, ButtonDesign, ObjectPageMode, ObjectPageSection, } from '@ui5/webcomponents-react';
import SampleImage from './images/sample-image.png'
import Shell from './Shell';
import { useHistory } from "react-router-dom";

function AccountPage() {

    function onHeaderAction1Pressed() {
        return null;
    }

    function onHeaderAction2Pressed() {
        return null;
    }

    const history = useHistory();
    const handleClick = (type: string) => () => {
        history.push(`/video/${type}`);
    };


    return (
        <div style={{ width: 'calc(100% - 1rem)', height: '100%', position: 'relative', marginTop: '2rem' }}>
            <Shell />
            <ObjectPage
                title={'Nicky'}
                // subTitle={'Object Page Sub Title'}
                headerActions={[
                    <Button key="1" design={ButtonDesign.Accept} style={{ 'backgroundColor': '#0b4214', 'color': 'white', 'fontWeight': 'bold' }} onClick={onHeaderAction1Pressed}>
                        Mein Profil
                    </Button>
                    // <Button key="2" design={ButtonDesign.Accept} style={{ 'backgroundColor': '#0b4214', 'color': 'white', 'fontWeight': 'bold' }} onClick={onHeaderAction2Pressed}>Mein Profil</Button>
                ]}
                image={SampleImage}
                // renderHeaderContent={renderHeaderContent}
                mode={ObjectPageMode.IconTabBar}
                imageShapeCircle={false}
                showHideHeaderButton={true}
                selectedSectionId={"1"}
                // onSelectedSectionChanged={action('onSelectedSectionChanged')}
                noHeader={false}
                style={{ height: '700px' }}
            >

                <ObjectPageSection title="Mein Dashboard" id="1">
                    <Badge colorScheme={'8'}>AVAILABLE</Badge>
                </ObjectPageSection>
                <ObjectPageSection title="Lobby" id="1">
                    <Card
                        heading={'Meine Supporter:innen'}
                        subtitle={'Available'}
                        status={'4'}
                        avatar={<Icon name="order-status" />}
                        headerInteractive={true}
                    // onHeaderClick={action('onHeaderClick')}
                    >
                        <List onItemClick={handleClick('patient')}>
                            <StandardListItem ><Badge colorScheme={'8'} style={{ 'marginRight': "10px" }} >Online</Badge>Daisy</StandardListItem>
                            <StandardListItem ><Badge colorScheme={'7'} style={{ 'marginRight': "10px" }}>Idle</Badge>Orchid</StandardListItem>
                            <StandardListItem ><Badge colorScheme={'8'} style={{ 'marginRight': "10px" }} >Online</Badge>Tree</StandardListItem>
                        </List>
                    </Card>
                </ObjectPageSection>
            </ObjectPage>
        </div>
    );
}

export default AccountPage;

