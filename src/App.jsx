import 'bootstrap';
import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';
import { autoLogin } from './store/actions/auth';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import PropTypes from 'prop-types';
const Dashboard = lazy(() =>
	import(/* webpackChunkName: "dashboard" */ './containers/Dashboard')
);
const Login = lazy(() =>
	import(/* webpackChunkName: "login" */ './containers/Login')
);
const Register = lazy(() =>
	import(/* webpackChunkName: "register" */ './containers/Register')
);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.autoLogin();
	}
	render() {
		return (
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<PublicRoute exact path="/login/" component={Login} />
						<PublicRoute exact path="/register/" component={Register} />
						<PrivateRoute exact path="/" component={Dashboard} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		);
	}
}

App.propTypes = {
	autoLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		autoLogin: () => dispatch(autoLogin()),
	};
};
export default connect(null, mapDispatchToProps)(App);
