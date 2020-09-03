import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authSignup } from "../../store/actions/auth";
import styles from "../Login/style.module.scss";
import Footer from "../Footer";
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { firstname, lastname, email, password, dob } = this.state;
    this.props.signup(firstname, lastname, email, password, dob);
    this.setState({});
  };

  render() {
    return (
      <Fragment>
        {this.props.token ? <Redirect to="/" /> : null}
        <div className="container jumbotron ">
          <h1 className={`${styles.h1} text-center text-primary mb-5`}>
            Friendsbook
          </h1>
          <div className="d-flex justify-content-center h-100">
            <div className={`${styles.card} text-center shadow`}>
              {this.props.error ? (
                <div className="alert alert-danger fade show" role="alert">
                  {this.props.error.message}
                </div>
              ) : null}
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
                        value={this.state?.firstname}
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
                        value={this.state?.lastname}
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
                    value={this.state?.email}
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state?.password}
                    minLength="8"
                    onChange={this.handleChange}
                    required
                  />
                  <br />
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">Date of birth</div>
                    </div>
                    <input
                      type="date"
                      name="dob"
                      className="form-control"
                      placeholder="Date of birth"
                      value={this.state?.dob}
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
                <Link to="/login">Already have an account?</Link>
                <br />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

Register.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  token: PropTypes.string,
  signup: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (firstname, lastname, email, password, dob) =>
      dispatch(authSignup(firstname, lastname, email, password, dob)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);