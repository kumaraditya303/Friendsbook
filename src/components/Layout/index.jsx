import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<Fragment>
            {this.props.children}

        </Fragment>);
    }
}

export default withRouter(
    connect()(Layout)
)
