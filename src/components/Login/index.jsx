import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { authLogin } from '../../store/actions/auth';
import styles from './style.module.css';
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password);
    }
    render() {
        const { token } = this.props;
        if (token) return <Redirect to='/' />
        return (<Fragment>
            <div className="container jumbotron ">
                <h1 className={`${styles.h1} text-center text-primary mb-5`}>Friendsbook</h1>
                <div className="d-flex justify-content-center h-100">
                    <div className={`${styles.card} text-center shadow`}  >
                        {this.props.error ?
                            <div className='alert alert-danger fade show' role='alert' >
                                {this.props.error.message}
                            </div>
                            : null
                        }
                        <div className="card-header">
                            <h3 className="h3">Login </h3>
                        </div>
                        <div className="card-body">
                            <form method="POST" onSubmit={this.handleSubmit} >
                                <input type="email" name="email" className='form-control' placeholder='Email address' onChange={this.handleChange} /><br />
                                <input type="password" name="password" className='form-control' placeholder='Password' minLength='8' onChange={this.handleChange} /><br />
                                {this.props.loading ?
                                    <div className="spinner-border text-primary" role='status' ></div>
                                    :
                                    <input type="submit" value="Login" className='btn btn-block btn-primary' />
                                }
                            </form>

                        </div>
                        <div className="card-footer">
                            <Link to='/' >Forgotten Password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>);
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(authLogin(username, password))
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login));
