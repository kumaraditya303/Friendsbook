import 'bootstrap';
import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { autoLogin } from './redux/auth/actions';
import { fetchPosts } from './redux/post/actions';
import { RootState } from './redux';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
const Dashboard = lazy(
  () => import(/* webpackChunkName: "dashboard" */ './containers/Dashboard')
);
const Login = lazy(
  () => import(/* webpackChunkName: "login" */ './containers/Login')
);
const Register = lazy(
  () => import(/* webpackChunkName: "register" */ './containers/Register')
);

interface Props {
  autoLogin: () => void;
  fetchPosts: () => void;
}

class App extends Component<Props> {
  state = {};
  componentDidMount() {
    this.props.autoLogin();
    this.props.fetchPosts();
  }
  render() {
    return (
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="container">
              <div className="row h-100 align-self-center justify-content-center">
                <div
                  className="col-md-auto spinner-border text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          }
        >
          <Switch>
            <PublicRoute exact path="/login/:next?/" component={Login} />
            <PublicRoute exact path="/register/:next?/" component={Register} />
            <PrivateRoute exact path="/" component={Dashboard} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>
) => ({
  autoLogin: () => dispatch(autoLogin()),
  fetchPosts: () => dispatch(fetchPosts()),
});
export default connect(null, mapDispatchToProps)(App);
