import React from 'react';

import { Input, ShellBar, ButtonDesign, ShellBarItem, Button } from '@ui5/webcomponents-react';
import SampleImage from './images/sample-image.png'
function Shell() {
    return (
        <div style={{ 'backgroundColor': '#0b4214 !important', 'color': 'white', 'fontWeight': 'bold' }} >
            <ShellBar
                // logo={ZenLogo}
                primaryTitle={'Zen Garden'}
                // secondaryTitle={'Secondary Title'}
                notificationCount={"10"}
                profile={SampleImage}
                showNotifications={true}

                // onMenuItemClick={action('onMenuItemClick')}
                // onCoPilotClick={action('onCoPilotClick')}
                // onLogoClick={action('onLogoClick')}
                // onNotificationsClick={action('onNotificationsClick')}
                // onProfileClick={action('onProfileClick')}
                onProductSwitchClick={(e) => {
                    // @ts-ignore
                    document.getElementById('product-switch-popover').openBy(e.getParameter('targetRef'));
                }}
                searchField={null}
                startButton={null}
            >
                <Input slot="searchField"></Input>
                <Button icon="nav-back" slot="startButton" design={ButtonDesign.Accept}  ></Button>
            </ShellBar>
        </div >)
}

export default Shell;
