import React from 'react';

import { ObjectPage, Card, StandardListItem, List, Timeline, TimelineItem, Button, Badge, ButtonDesign, ObjectPageMode, ObjectPageSection, } from '@ui5/webcomponents-react';
import SampleImage from './images/sample-image.png'
import Shell from './Shell';
import { Icon } from '@ui5/webcomponents-react/lib/Icon';
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
                title={'Dr. John Doe'}
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
                showHideHeaderButton={false}
                selectedSectionId={"1"}
                // onSelectedSectionChanged={action('onSelectedSectionChanged')}
                noHeader={false}
                style={{ height: '700px' }}
            >

                <ObjectPageSection title="Mein Dashboard" id="1">
                    <Badge colorScheme={'8'}>History</Badge>

                    <Timeline>
                        <TimelineItem titleText="called" subtitleText={'2019/01/01'} icon="phone" itemName="John Smith" />
                        <TimelineItem titleText="Weekly Sync - CP Design" subtitleText={'2019/01/02'} icon="calendar">
                            <div>MR SOF02 2.43</div>
                        </TimelineItem>
                    </Timeline>
                </ObjectPageSection>
                <ObjectPageSection title="Lobby" id="1">
                    <Card
                        heading={'Meine Patient:innen'}
                        subtitle={'Available'}
                        status={'4'}
                        avatar={<Icon name="order-status" />}
                        headerInteractive={true}
                    // onHeaderClick={action('onHeaderClick')}
                    >
                        <List onItemClick={handleClick('supporter')}>
                            <StandardListItem key="1" info="22. Mar 2020 17:31:00"><Badge colorScheme={'8'} style={{ 'marginRight': "10px" }} >Online</Badge> Nicky </StandardListItem>
                            <StandardListItem key="2" info="21. Mar 2020 17:31:00"><Badge colorScheme={'8'} style={{ 'marginRight': "10px" }} >Online</Badge>Daisy</StandardListItem>
                            <StandardListItem key="3" info="20. Mar 2020 17:31:00"><Badge colorScheme={'8'} style={{ 'marginRight': "10px" }}>Online</Badge>Orchid</StandardListItem>
                            <StandardListItem key="4" info="18. Mar 2020 17:31:00"><Badge colorScheme={'8'} style={{ 'marginRight': "10px" }} >Online</Badge>Tree</StandardListItem>
                        </List>
                    </Card>
                </ObjectPageSection>
            </ObjectPage>
        </div>
    );
}

export default AccountPage;

