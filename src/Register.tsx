import { Button, ButtonDesign, FlexBox, FlexBoxAlignItems, FlexBoxDirection } from '@ui5/webcomponents-react';
import React from 'react';
import { useHistory } from "react-router-dom";



function Register() {
    const history = useHistory();
    const handleClick = () => {
        history.push("./newAccount");
    };
    const handleClick1 = () => {
        history.push("./newAccountSupporter");
    };


    return (

        <FlexBox alignItems={FlexBoxAlignItems.Center} direction={FlexBoxDirection.Column}>
            <div>
                <Button style={{ 'margin': '15px auto', 'backgroundColor': '#0b4214', 'color': 'white', 'fontWeight': 'bold', 'width': '200px' }} design={ButtonDesign.Accept} onClick={handleClick}>Ich bin Patient</Button>
            </div>
            <div>
                <Button style={{ 'backgroundColor': '#0b4214', 'color': 'white', 'fontWeight': 'bold', 'width': '200px' }} design={ButtonDesign.Accept} onClick={handleClick1}>Ich bin Supporter</Button>
            </div>
        </FlexBox>
    );
}

export default Register;
