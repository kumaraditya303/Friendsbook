import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../redux';

const PrivateRoute = (props: any) => {
  const { authenticated } = props;
  if (!authenticated) return <Redirect to="/login/" />;
  return <Route {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
