import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedLayout from "./layouts/ProtectedLayout";
import AuthLayout from "./layouts/AuthLayout";
import ErrorLayout from "./layouts/ErrorLayout";

const App = () =>  {
    return (
        <div className="application">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={props => <ProtectedLayout {...props} />} />

                    <Route path="/auth" render={props => <AuthLayout {...props} />} />
                    <Route path="/" render={props => <ProtectedLayout {...props} />} />

                    <Route render={ (props)=> <ErrorLayout errorCode={404} { ...props }/> }  />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;