import React from 'react';

import { Grid, FlexBoxAlignItems, FlexBoxJustifyContent, FlexBox, PlacementType, Popover, ProductSwitch, ProductSwitchItem, ThemeProvider } from '@ui5/webcomponents-react';
import { Route, Switch, Link } from "react-router-dom";
import './App.css';
import NewAccount from './NewAccount';
import Register from './Register';
import ZenLogo from './images/zen-garden-logo-transp.png';
import Background from './images/background.jpeg';

export default () => {
    return (
        <div style={{ minHeight: '100%', backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <ThemeProvider withToastContainer>
                <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.Center} height="100">
                    <Grid >
                        <Link to={'/'}><img src={ZenLogo} width={150} /></Link>
                    </Grid>
                    <Grid>
                        <Switch>
                            /* Route components are rendered if the path prop matches the current URL */
                            <Route path="/" component={Register} exact />
                            <Route path="/newAccount" component={NewAccount} />
                        </Switch>
                    </Grid>
                </FlexBox>
            </ThemeProvider >
        </div>
    )
}