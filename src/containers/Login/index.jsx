import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { login } from '../../redux/auth/actions';
import styles from './style.module.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };
  render() {
    return (
      <Fragment>
        <div className="container jumbotron ">
          <h1 className={cx(styles.h1, 'text-center', 'text-primary', 'mb-5')}>
            Friendsbook
          </h1>
          <div className="d-flex justify-content-center h-100">
            <div className={cx(styles.card, 'text-center', 'shadow')}>
              {this.props.error && (
                <div className="alert alert-danger fade show" role="alert">
                  {this.props.error.message}
                </div>
              )}
              <div className="card-header">
                <h3 className="h3">Login </h3>
              </div>
              <div className="card-body">
                <form method="POST" onSubmit={this.handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    minLength="8"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  {this.props.loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-block btn-primary"
                    />
                  )}
                </form>
              </div>
              <div className="card-footer">
                <Link to="/forgot">Forgotten Password?</Link>
                <br />
                <Link to="/register" className="btn btn-outline-success btn-lg">
                  Create New Account
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  authenticated: state.auth.authenticated,
});
const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
