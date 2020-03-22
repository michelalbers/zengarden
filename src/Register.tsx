import React from 'react';
import { Button } from '@ui5/webcomponents-react';

import { HashRouter, Route, Switch, useHistory } from "react-router-dom";


function Register() {
    const history = useHistory();
    const handleClick = () => {
        history.push("./newAccount");
    };

    return (
        <div>
            <div>
                <Button onClick={handleClick}>Ich bin Patient</Button>
            </div>
            <div>
                <Button>Ich bin Supporter</Button>
            </div>
        </div>
    );
}

export default Register;
