import React, {Component, useContext, useState} from 'react';
import AppLayout from "./Layouts/App/AppLayout";
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import MyStoreLayout from "./Layouts/MyStore/MyStoreLayout";
import AuthLayout from "./Layouts/Auth/AuthLayout";
import AuthService from "./Services/AuthService";

function AppRoute() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const service = AuthService.getInstance();

    if(isLoading || !isAuthenticated)
        service.refreshToken().then(() => {
            setIsAuthenticated(service.isLoggedIn())
            setIsLoading(false);
        })
            .catch(() => {
                // not logged in
                setIsLoading(false);
            });

    if(!isLoading)
    return (
        <Switch>
            <Route path='/auth' component={AuthLayout} />
            <GuardRoute isAuthenticated={isAuthenticated} path='/app'>
                <AppLayout />
            </GuardRoute>
            <GuardRoute isAuthenticated={isAuthenticated} path='/my-store'>
                <MyStoreLayout />
            </GuardRoute>
        </Switch>
    );

    return <div> App is loading...</div>
}

interface GuardProps extends RouteProps {
    isAuthenticated: boolean
}

const GuardRoute = (props: GuardProps) => {
    const { isAuthenticated, children, ...rest } = props;
    return (
        <Route
            {...rest}
            render={ routerProps =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth",
                            state: { from: routerProps.location }
                        }}
                    />
                )
            }
        />
    );
}

export default AppRoute;
