import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import styles from './style.module.scss'
export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (<Fragment>
            {this.props.children}
            <div className="container">
                <hr className={`${styles.hr}`} />
                <footer>
                    <p>&copy; {new Date().getFullYear()} - Friendsbook</p>
                </footer>
            </div>
        </Fragment>);
    }
}

export default withRouter(
    connect()(Layout)
)
