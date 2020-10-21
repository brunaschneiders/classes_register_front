import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './routeWrapper';

import Login from '../pages/login';

import AdminPersonalData from '../pages/adminPages/personalData';
import AdminAvailableClasses from '../pages/adminPages/availableClassess';
import AdminUsers from '../pages/adminPages/users';
import AdminGrowdevers from '../pages/adminPages/growdevers';

import GrowdeverPersonalData from '../pages/growdeverPages/personalData';
import GrowdeverAvailableClasses from '../pages/growdeverPages/availableClasses';
import GrowdeverScheduledClasses from '../pages/growdeverPages/scheduledClasses';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />

        {/* Admin Pages */}
        <Route
          path="/admin/personal-data"
          exact
          isPrivateAdmin
          component={AdminPersonalData}
        />
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
          path="/growdever/personal-data"
          exact
          isPrivateGrowdever
          component={GrowdeverPersonalData}
        />
        <Route
          path="/growdever/available-classes"
          exact
          isPrivateGrowdever
          component={GrowdeverAvailableClasses}
        />
        <Route
          path="/growdever/scheduled-classes"
          exact
          isPrivateGrowdever
          component={GrowdeverScheduledClasses}
        />
      </Switch>
    </BrowserRouter>
  );
}
