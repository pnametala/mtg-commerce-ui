import React from 'react';
import AppLayout from "./Layouts/App/AppLayout";
import { Route, Switch } from 'react-router-dom';
import MyStoreLayout from "./Layouts/MyStore/MyStoreLayout";
import AuthLayout from "./Layouts/Auth/AuthLayout";

function AppRoute() {
  return (
    <Switch>
        {/*<Route path='/login' component={Login} />*/}
        <Route path='/auth' component={AuthLayout} />
        <Route path='/app' component={AppLayout} />
        <Route path='/my-store' component={MyStoreLayout} />
    </Switch>
  );
}

export default AppRoute;
