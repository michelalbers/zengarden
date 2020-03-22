import { Grid, PlacementType, Popover, ProductSwitch, ProductSwitchItem, ThemeProvider } from '@ui5/webcomponents-react';
import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import './App.css';
import NewAccount from './NewAccount';
import Register from './Register';
import Shell from './Shell';

export default () => {
    const history = useHistory();
    const handleClick = () => {
        history.push("./");
    };
    return (
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
                <Switch>
                    /* Route components are rendered if the path prop matches the current URL */
                    <Route path="/newAccount" component={NewAccount} />
                </Switch>
                <div>
                    <img src={require('./images/zen-garden-logo.png')} onClick={handleClick} />
                    <Register />
                </div>
            </Grid>
        </ThemeProvider >
    )
}