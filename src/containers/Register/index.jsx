import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import '../../index.scss';
import { register } from '../../redux/auth/actions';
import styles from '../Login/style.module.scss';
class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    dob: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { firstname, lastname, email, password, dob } = this.state;
    this.props.signup(firstname, lastname, email, password, dob);
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Friendsbook - Register</title>
        </Helmet>
        <div className="container jumbotron">
          <h1 className={cx(styles.h1, 'text-center', 'text-primary', 'mb-5')}>
            Friendsbook
          </h1>
          <div className="d-flex justify-content-center h-100">
            <div className={cx(styles.card, 'text-center')}>
              {this.props.error && (
                <div className="alert alert-danger fade show" role="alert">
                  {this.props.error.message}
                </div>
              )}
              <div className="card-header">
                <h3 className="h3">Register</h3>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        name="firstname"
                        className="form-control"
                        placeholder="First name"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        name="lastname"
                        className="form-control"
                        placeholder="Last name"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <br />
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
                  <div className="input-group">
                    <span className="input-group-text">Date of birth</span>
                    <input
                      type="date"
                      name="dob"
                      className="form-control"
                      placeholder="Date of birth"
                      onChange={this.handleChange}
                      max="2002-01-01"
                      required
                    />
                  </div>
                  <br />
                  {this.props.loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-block btn-primary"
                    />
                  )}
                </form>
              </div>
              <div className="card-footer">
                <Link to="/login/">Already have an account?</Link>
                <br />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
Register.propTypes = {
  loading: PropTypes.bool,
  signup: PropTypes.func,
  error: PropTypes.object,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (firstname, lastname, email, password, dob) =>
    dispatch(register(firstname, lastname, email, password, dob)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
