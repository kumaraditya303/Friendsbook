import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux';
import { AnyAction } from 'redux';
import { logout } from '../../redux/auth/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
interface Props {
  user: any;
  logOut: () => void;
}
const Sidebar: React.FC<Props> = ({ user, logOut }) => {
  return (
    <div className="wrapper d-flex align-items-stretch">
      <nav className="sidebar">
        <div className="p-4 pt-5">
          <img src={user.image} className="img logo rounded-circle mb-5" />
          <p className="lead text-center">
            {user.first_name} {user.last_name}
          </p>
          <ul className="list-unstyled components mb-5">
            <li className="active">
              <a
                href="#homeSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Home
              </a>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                  <a href="#">Home 1</a>
                </li>
                <li>
                  <a href="#">Home 2</a>
                </li>
                <li>
                  <a href="#">Home 3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a
                href="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Pages
              </a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <a href="#">Page 1</a>
                </li>
                <li>
                  <a href="#">Page 2</a>
                </li>
                <li>
                  <a href="#">Page 3</a>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <a href="#" onClick={logOut}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({ user: state.auth.user });

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>
) => ({
  logOut: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
