import { Button, Input, FlexBox } from '@ui5/webcomponents-react';
import React from 'react';

function NewAccount() {
    return (
        <FlexBox>
            <div>
                <Input placeholder="Gib deinen Benutzernamen ein"></Input>
            </div>
            <div>
                <Button>Weiter</Button>
            </div>
        </FlexBox>
    );
}

export default NewAccount;