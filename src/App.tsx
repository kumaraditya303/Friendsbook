import 'bootstrap';
import React, { Component, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './redux';
import { fetchPosts } from './redux/post/actions';
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

const Chat = lazy(() => import('./components/Chat'));

interface Props {
  fetchPosts: () => void;
}

class App extends Component<Props> {
  state = {};
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <>
        <Helmet>
          <meta
            name="description"
            content="A Social App built with Django & React"
          />
        </Helmet>
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
              <PublicRoute exact path="/login">
                <Login />
              </PublicRoute>
              <PublicRoute exact path="/register">
                <Register />
              </PublicRoute>
              <PrivateRoute exact path="/chat">
                <Chat />
              </PrivateRoute>
              <PrivateRoute path="/">
                <Dashboard />
              </PrivateRoute>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </>
    );
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>
) => ({
  fetchPosts: () => dispatch(fetchPosts()),
});
export default connect(null, mapDispatchToProps)(App);
