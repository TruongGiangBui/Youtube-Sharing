import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));


const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/user/login" component={Login} />
          <Route path="/user/register" component={Register1} />


        </Switch>
      </Suspense>
    );
  }
}

export default withRouter(AppRoutes);