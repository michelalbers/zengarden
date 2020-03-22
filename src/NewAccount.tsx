import React from 'react';

import { Button, Input, Icon, FlexBoxAlignItems, FlexBoxDirection, Text, InputType, FlexBox, ButtonDesign } from '@ui5/webcomponents-react';
import { useHistory } from "react-router-dom";


function NewAccount() {
    const history = useHistory();
    const handleClick = () => {
        history.push("./account");
    };
    return (

        <FlexBox alignItems={FlexBoxAlignItems.Center} direction={FlexBoxDirection.Column}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} direction={FlexBoxDirection.Row}>
                <Text style={{ 'color': 'white', fontWeight: 'bold', width: '105px' }}>Benutzername: </Text>
                <Input style={{ 'width': '250px' }} type={InputType.Text} placeholder="Gib deinen Benutzernamen ein ... "></Input>
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} direction={FlexBoxDirection.Row} style={{ margin: '15px auto' }}>
                <Text style={{ 'color': 'white', fontWeight: 'bold', width: '105px' }}>E-mail: </Text>
                <Input style={{ 'width': '250px' }} type={InputType.Email} placeholder="Gib deine E-mail Addresse ein ..."></Input>

            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Start}>
                <Button design={ButtonDesign.Accept} style={{ 'backgroundColor': '#0b4214', 'color': 'white', 'fontWeight': 'bold' }} onClick={handleClick} >Weiter</Button>
            </FlexBox>

        </FlexBox >
    );
}

export default NewAccount;