import 'bootstrap';
import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './utils/PrivateRoute';
const Dashboard = lazy(() => import('./components/Dashboard'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Router>
				<Suspense fallback={<div >Loading...</div>}>
					<PrivateRoute
						exact
						path="/"
						component={Dashboard}
						authenticated={this.state.authenticated}
					/>
					<Route exact path="/login/:next?" component={Login} />
					<Route exact path="/register/:next?" component={Register} />
				</Suspense>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.authenticated,
	};
};

export default connect(mapStateToProps)(App);
