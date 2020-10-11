import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../../components/Editor';
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <Editor />;
	}
}

const mapStateToProps = (state) => {
	return {
		name: state.auth.user.email,
	};
};

export default connect(mapStateToProps)(Dashboard);
