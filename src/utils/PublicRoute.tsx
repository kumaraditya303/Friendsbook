import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../redux";

const PublicRoute = (props: any) => {
  const { authenticated } = props;
  if (authenticated) return <Redirect to="/" />;
  return <Route {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  authenticated: state.auth.authenticated,
});
export default connect(mapStateToProps)(PublicRoute);
