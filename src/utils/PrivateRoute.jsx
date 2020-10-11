import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const PrivateRoute = (props) => {
	const { authenticated } = props;
	if (!authenticated) return <Redirect to="/login/" />;
	return <Route {...props} />;
};

PrivateRoute.propTypes = {
	authenticated: PropTypes.bool,
};
const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.authenticated,
	};
};

export default connect(mapStateToProps)(PrivateRoute);
