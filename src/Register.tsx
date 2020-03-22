import React from 'react';
import { Button, ButtonDesign, FlexBox, FlexBoxAlignItems, FlexBoxJustifyContent } from '@ui5/webcomponents-react';

import { HashRouter, Route, Switch, useHistory } from "react-router-dom";


function Register() {
    const history = useHistory();
    const handleClick = () => {
        history.push("./newAccount");
    };

    return (
        <FlexBox alignItems={FlexBoxAlignItems.Stretch} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
            <div>
                <Button style={{ 'width': '200px' }} design={ButtonDesign.Accept} onClick={handleClick}>Ich bin Patient</Button>
            </div>
            <div>
                <Button style={{ 'width': '200px' }} design={ButtonDesign.Accept} onClick={handleClick} >Ich bin Supporter</Button>
            </div>
        </FlexBox>
    );
}

export default Register;
