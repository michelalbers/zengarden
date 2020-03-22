import React from 'react';

import { ObjectPage, Button, Badge, ButtonDesign, ObjectPageMode, ObjectPageSection, } from '@ui5/webcomponents-react';
import SampleImage from './images/sample-image.png'
import Shell from './Shell';

function AccountPage() {

    function onHeaderAction1Pressed() {
        return null;
    }

    function onHeaderAction2Pressed() {
        return null;
    }

    return (
        <div style={{ width: 'calc(100% - 1rem)', height: '100%', position: 'relative', marginTop: '2rem' }}>
            <Shell />
            <ObjectPage
                title={'Nicky'}
                // subTitle={'Object Page Sub Title'}
                headerActions={[
                    <Button key="1" design={ButtonDesign.Accept} style={{ 'backgroundColor': '#0b4214', 'color': 'white', 'fontWeight': 'bold' }} onClick={onHeaderAction1Pressed}>
                        Lobby
                    </Button>,
                    <Button key="2" design={ButtonDesign.Accept} style={{ 'backgroundColor': '#0b4214', 'color': 'white', 'fontWeight': 'bold' }} onClick={onHeaderAction2Pressed}>Mein Profil</Button>
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
                    <Badge colorScheme={'1'}>Badge</Badge>
                    <div>My Content 1</div>
                </ObjectPageSection>
            </ObjectPage>
        </div>
    );
}

export default AccountPage;

