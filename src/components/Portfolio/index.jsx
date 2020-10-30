import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar';
import styles from './style.module.scss';

class Portfolio extends Component {
  state = {
    file: null,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(...new FormData(event.target).values());
    console.log(event);
  };

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  render() {
    return (
      <>
        <div className="p-0 container-fluid row">
          <div className="col-md-4">
            <Sidebar />
          </div>
          <div className="col-md-8 mt-5">
            <div
              className={cx(
                'card d-flex mx-auto text-center border border-primary',
                styles.card
              )}
            >
              <div className="card-image mt-5">
                <img
                  src={
                    this.state.file
                      ? URL.createObjectURL(this.state.file)
                      : this.props.user.image
                  }
                  alt="..."
                  className="rounded-circle d-flex mx-auto card-img"
                />
              </div>
              <div className="card-body">
                <div className="card-title text-uppercase">
                  <h1 className="text-primary">
                    {this.props.user.first_name} {this.props.user.last_name}
                  </h1>
                </div>
                <form onSubmit={this.handleSubmit} method="POST">
                  <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      required
                      defaultValue={this.props.user.email}
                      disabled
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">🔏</span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="New password"
                      required
                    />
                  </div>
                  <div className="form-file">
                    <input
                      className="form-file-input"
                      type="file"
                      name="images"
                      multiple
                      onChange={this.handleFileChange}
                      id="customFile"
                    />
                    <label className="form-file-label" htmlFor="customFile">
                      <span className="form-file-text">
                        Choose{' '}
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-card-image"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.5 3h-13a.5.5 0 0 0-.5.5v9c0 .013 0 .027.002.04V12l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15 9.499V3.5a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm4.502 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                          />
                        </svg>
                      </span>
                      <span className="form-file-button">Browse</span>
                    </label>
                  </div>
                  <br />
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-primary float-left"
                  />
                  <input
                    type="reset"
                    value="Reset"
                    className="btn btn-primary float-right"
                    onClick={() => this.setState({ file: null })}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Portfolio.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({ user: state.auth.user });

export default connect(mapStateToProps)(Portfolio);
