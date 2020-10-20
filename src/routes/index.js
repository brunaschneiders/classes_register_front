import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './routeWrapper';

import Login from '../pages/login';

import AdminAvailableClasses from '../pages/adminPages/availableClassess';
import AdminUsers from '../pages/adminPages/users';
import AdminGrowdevers from '../pages/adminPages/growdevers';

import GrowdeverAvailableClasses from '../pages/growdeverPages/availableClassess';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />

        {/* Admin Pages */}
        <Route
          path="/admin/available-classes"
          exact
          isPrivateAdmin
          component={AdminAvailableClasses}
        />
        <Route
          path="/admin/users"
          exact
          isPrivateAdmin
          component={AdminUsers}
        />
        <Route
          path="/admin/growdevers"
          exact
          isPrivateAdmin
          component={AdminGrowdevers}
        />

        {/* Growdever Pages */}
        <Route
          path="/growdever/available-classes"
          exact
          isPrivateGrowdever
          component={GrowdeverAvailableClasses}
        />
      </Switch>
    </BrowserRouter>
  );
}
