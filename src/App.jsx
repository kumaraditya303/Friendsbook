import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <Layout {...this.props}>
          <BaseRouter />
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
