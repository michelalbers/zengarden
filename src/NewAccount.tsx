import { Button, Input, Icon, FlexBoxAlignItems, FlexBoxDirection, Text, InputType, FlexBox, ButtonDesign } from '@ui5/webcomponents-react';
import React from 'react';

function NewAccount() {
    return (
        <FlexBox alignItems={FlexBoxAlignItems.Center} direction={FlexBoxDirection.Column}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} direction={FlexBoxDirection.Row}>
                <Text style={{ 'color': 'white', fontWeight: 'bold', width: '105px' }}>Benutzername: </Text>
                <Input style={{ 'width': '200px' }} type={InputType.Text} placeholder="Gib deinen Benutzernamen ein"></Input>
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Start} direction={FlexBoxDirection.Row} style={{ margin: '15px auto' }}>
                <Text style={{ 'color': 'white', fontWeight: 'bold', width: '105px' }}>E-mail: </Text>
                <Input style={{ 'width': '200px' }} type={InputType.Text} placeholder="Gib deine E-mail Addresse ein"></Input>

            </FlexBox>
            <Button design={ButtonDesign.Accept}>Weiter</Button>
        </FlexBox >
    );
}

export default NewAccount;