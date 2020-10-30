import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
const PublicRoute = ({ children, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      authenticated ? (
        <Redirect
          to={{
            pathname: location.state?.from.pathname ?? '/',
            state: { from: location },
          }}
        />
      ) : (
        children
      )
    }
  />
);

PublicRoute.propTypes = {
  children: PropTypes.node,
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});
export default connect(mapStateToProps)(PublicRoute);
