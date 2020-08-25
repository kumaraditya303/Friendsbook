import React, { Component } from "react";
import PostEditor from "../PostEditor";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <PostEditor />;
  }
}
export default Dashboard;
