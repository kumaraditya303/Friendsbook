import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <h1>Hello {this.props.name}</h1>;
	}
}

const mapStateToProps = (state) => {
	return {
		name: state.auth.user.email,
	};
};

export default connect(mapStateToProps)(Dashboard)
