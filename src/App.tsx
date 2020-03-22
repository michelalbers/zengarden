import React from 'react';
import { Card } from '@uifabric/react-cards';
import { Stack, Text } from 'office-ui-fabric-react';
import { Input, ShellBar, ShellBarItem, Popover, PlacementType, ProductSwitch, ProductSwitchItem, Button, Grid, ThemeProvider } from '@ui5/webcomponents-react';
import './App.css';
import Register from './Register';
import Shell from './Shell';
import NewAccount from './NewAccount';

import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const handleClick = () => {
    history.push("./");
  };
  return (
    <BrowserRouter>
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
    </BrowserRouter>

  );
}

export default App;
