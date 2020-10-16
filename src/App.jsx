import 'bootstrap';
import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';
import { autoLogin } from './redux/auth/actions';
import { fetchPosts } from './redux/post/actions';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
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
	state = {};
	componentDidMount() {
		this.props.autoLogin();
		this.props.fetchPosts();
	}
	render() {
		return (
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<PublicRoute exact path="/login/:next?" component={Login} />
						<PublicRoute exact path="/register/:next?" component={Register} />
						<PrivateRoute exact path="/" component={Dashboard} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	autoLogin: () => dispatch(autoLogin()),
	fetchPosts: () => dispatch(fetchPosts()),
});
export default connect(null, mapDispatchToProps)(App);
