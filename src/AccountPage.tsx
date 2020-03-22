import React from 'react';

import { ObjectPage, Button, ButtonDesign, ObjectPageMode, ObjectPageSection, } from '@ui5/webcomponents-react';
import SampleImage from 'images/sample-image.png'
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
                title={'Object Page Title'}
                subTitle={'Object Page Sub Title'}
                headerActions={[
                    <Button key="1" design={ButtonDesign.Emphasized} onClick={onHeaderAction1Pressed}>
                        Primary Action
                    </Button>,
                    <Button key="2" onClick={onHeaderAction2Pressed}>
                        Action
                    </Button>
                ]}
                image={SampleImage}
                // renderHeaderContent={renderHeaderContent}
                mode={ObjectPageMode.IconTabBar}
                // imageShapeCircle={boolean('imageShapeCircle', false)}
                // showHideHeaderButton={boolean('showHideHeaderButton', true)}
                selectedSectionId={"1"}
                // onSelectedSectionChanged={action('onSelectedSectionChanged')}
                // noHeader={boolean('noHeader', false)}
                style={{ height: '700px' }}
            >
                <ObjectPageSection title="Test 1" id="1">
                    <div>My Content 1</div>
                </ObjectPageSection>
            </ObjectPage>
        </div>
    );
}

export default AccountPage;

