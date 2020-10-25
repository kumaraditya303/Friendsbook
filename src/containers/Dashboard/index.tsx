import React, { Component } from "react";
import { connect } from "react-redux";
import Editor from "../../components/Editor/index";
import { RootState } from "../../redux/index";
import { Post } from "../../redux/post/types";
import PostMedia from "../../components/Post";
interface Props {
  posts: Post[];
  user: any;
}

class Dashboard extends Component<Props> {
  state = {};
  render() {
    return (
      <>
        <div className="container row mt-5">
          <div className="media col-6 offset-1 p-4 border border-primary post">
            <img
              className="mr-3 profile"
              src={this.props.user.image}
              alt="..."
            />
            <span className="text-primary h4">
              {this.props.user.first_name} {this.props.user.last_name}{" "}
            </span>
            <span className="badge bg-dark">{new Date().toTimeString()}</span>
            <div className="media-body mt-3">
              <Editor />
            </div>
          </div>
          <h2 className="col-6 offset-1 mt-5">Latest Posts</h2>
        </div>

        <div className="container row mt-5">
          {this.props.posts.map((post) => (
            <PostMedia post={post} key={post.id} />
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  posts: state.post.posts,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
