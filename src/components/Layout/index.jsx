import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './style.module.scss';

export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                {this.props.children}
                <div className="container">
                    <hr className={styles.hr} />
                    <footer>
                        <p>
                            &copy;
              {new Date().getFullYear()}
                            {' '}
              - Friendsbook
            </p>
                    </footer>
                </div>
            </Fragment>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    token: PropTypes.string,
    error: PropTypes.string,
    user: PropTypes.string
};
const mapStateToProps = (state) => ({
    token: state.auth.token,
    user: state.auth.user,
});
export default withRouter(
    connect(mapStateToProps)(Layout),
);
