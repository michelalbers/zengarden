import { Button, Input } from '@ui5/webcomponents-react';
import React from 'react';

function NewAccount() {
    return (
        <div>
            <div>
                <Input>Gib deinen Benutzernamen ein</Input>
            </div>
            <div>
                <Button>Weiter</Button>
            </div>
        </div>
    );
}

export default NewAccount;