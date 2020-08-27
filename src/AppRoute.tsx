import React, {Component, useContext, useEffect, useState} from 'react';
import AppLayout from "./Layouts/App/AppLayout";
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import MyStoreLayout from "./Layouts/MyStore/MyStoreLayout";
import AuthLayout from "./Layouts/Auth/AuthLayout";
import AuthService from "./Services/AuthService";
import IUser, {UserContext, UserProvider} from "./Components/UserProvider/UserProvider";

function AppRoute() {

    const service = AuthService.getInstance();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<IUser>(service.getCurrentUser());
    const [singleRun, setSingleRun] = useState(true)

    useEffect(() => {
        service.refreshToken().then(() => {
            setIsAuthenticated(service.isLoggedIn())
            setIsLoading(false);
            setUser(service.getCurrentUser());
        })
        .catch(() => {
            // not logged in
            setIsLoading(false);
        });
    }, [singleRun]);

    if(!isLoading)
    return (

        <UserContext.Provider value={user}>
            <Switch>
                <Route path='/auth' component={AuthLayout} />
                <GuardRoute isAuthenticated={isAuthenticated} path='/app'>
                    <AppLayout />
                </GuardRoute>
                <GuardRoute isAuthenticated={isAuthenticated} path='/my-store'>
                    <MyStoreLayout />
                </GuardRoute>
            </Switch>
        </UserContext.Provider>
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
