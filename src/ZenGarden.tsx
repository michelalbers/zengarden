import { Grid, PlacementType, Popover, ProductSwitch, ProductSwitchItem, ThemeProvider } from '@ui5/webcomponents-react';
import React from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './App.css';
import NewAccount from './NewAccount';
import Register from './Register';
import Shell from './Shell';
import ZenLogo from './images/zen-garden-logo.png';
import Background from './images/background.jpeg';

export default () => {
    return (
        <div style={{ minHeight: '100%', backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <ThemeProvider withToastContainer>
                <Shell />
                <Popover {...{ id: 'product-switch-popover' }} placementType={PlacementType.Bottom}>
                    <ProductSwitch>
                        <ProductSwitchItem
                            heading="UI5 Web Components"
                            targetSrc="https://github.com/SAP/ui5-webcomponents"
                            target="_blank"
                            icon="add"
                        />
                        <ProductSwitchItem
                            heading="UI5 Web Components"
                            subtitle="for React"
                            targetSrc="https://github.com/SAP/ui5-webcomponents-react"
                            target="_blank"
                            icon="add"
                        />
                    </ProductSwitch>
                </Popover>
                <Grid>
                    <Link to={'/'}><img src={ZenLogo} width={150} /></Link>
                </Grid>
                <Grid>
                    <Switch>
                        /* Route components are rendered if the path prop matches the current URL */
                        <Route path="/" component={Register} exact />
                        <Route path="/newAccount" component={NewAccount} />
                    </Switch>
                </Grid>
            </ThemeProvider >
        </div>
    )
}