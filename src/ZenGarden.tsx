import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, FlexBoxJustifyContent, Grid, ThemeProvider } from '@ui5/webcomponents-react';
import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import './App.css';
import Background from './images/background.jpeg';
import ZenLogo from './images/zen-garden-logo-transp.png';
import NewAccount from './NewAccount';
import Register from './Register';


export default () => {
    return (
        <div style={{ minHeight: '100%', backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <ThemeProvider withToastContainer>
                <FlexBox style={{ position: 'absolute', width: '100%', height: '100%' }} direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.Center} height="100">
                    <Grid >
                        <Link to={'/'}><img src={ZenLogo} width={250} /></Link>
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