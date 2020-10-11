import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
const PublicRoute = (props) => {
	const { authenticated } = props;
	if (authenticated) return <Redirect to="/" />;
	return <Route {...props} />;
};

const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.authenticated,
	};
};
PublicRoute.propTypes = {
	authenticated: PropTypes.bool,
};
export default connect(mapStateToProps)(PublicRoute);
