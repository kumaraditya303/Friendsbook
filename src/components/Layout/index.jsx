import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { logout } from '../../store/actions/auth';
import './style.module.css';
export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        const { authenticated } = this.props;
        return (<Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".collapse" aria-controls=".collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <Link className='navbar-brand' to='/'><FontAwesomeIcon icon={faHome} />  </Link>
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        {authenticated ?

                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => this.props.logout()} >Logout</Link>
                            </li>
                            :
                            <li className="nav-item active">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
            <div class="container-fluid">
                <div class="row">
                    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div class="sidebar-sticky pt-3">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link active" href="#">
                                        <span data-feather="home"></span>
              Dashboard <span class="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file"></span>
              Orders
            </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="shopping-cart"></span>
              Products
            </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="users"></span>
              Customers
            </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="bar-chart-2"></span>
              Reports
            </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="layers"></span>
              Integrations
            </a>
                                </li>
                            </ul>

                            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Saved reports</span>
                                <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                                    <span data-feather="plus-circle"></span>
                                </a>
                            </h6>
                            <ul class="nav flex-column mb-2">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text"></span>
              Current month
            </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text"></span>
              Last quarter
            </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text"></span>
              Social engagement
            </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text"></span>
              Year-end sale
            </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </Fragment>);
    }
}



const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: dispatch(logout()),
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Layout)
)
