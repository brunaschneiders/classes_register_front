import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './routeWrapper';

import Login from '../pages/login';
import AvailableClasses from '../pages/admin/availableClassess';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact isPrivate component={AvailableClasses} />
      </Switch>
    </BrowserRouter>
  );
}
