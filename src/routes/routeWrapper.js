import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';

import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';

import * as userActions from '../store/user/actions';

export default function RouteWrapper({
  component: Component,
  isPrivateAdmin,
  isPrivateGrowdever,
  ...rest
}) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(userActions.logout());
  }

  const userData = useSelector((state) => state.user);
  const userType = userData?.user?.type;
  let signed = false;

  if (userData) {
    signed = true;
  }

  if (!signed && isPrivateAdmin) {
    return <Redirect to="/" />;
  }
  if (signed && !isPrivateAdmin && userType === 'Admin') {
    return <Redirect to="/admin/available-classes" />;
  }
  if (signed && isPrivateAdmin && userType !== 'Admin') {
    handleLogout();
  }

  if (!signed && isPrivateGrowdever) {
    return <Redirect to="/" />;
  }
  if (signed && !isPrivateGrowdever && userType === 'Growdever') {
    return <Redirect to="/growdever/available-classes" />;
  }
  if (signed && isPrivateGrowdever && userType !== 'Growdever') {
    handleLogout();
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivateAdmin: propTypes.bool,
  isPrivateGrowdever: propTypes.bool,
  component: propTypes.oneOfType([propTypes.elementType, propTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivateAdmin: false,
  isPrivateGrowdever: false,
};
