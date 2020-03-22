import React from 'react';
import { Input, Button } from '@ui5/webcomponents-react';
import { HashRouter, Route, Switch, useHistory } from "react-router-dom";

function NewAccount() {
    const history = useHistory();
    const handleLogoClick = () => {
        history.push("./");
    };
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