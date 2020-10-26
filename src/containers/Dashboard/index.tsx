import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../../components/Editor/index';
import PostMedia from '../../components/Post';
import Sidebar from '../../components/Sidebar';
import { RootState } from '../../redux/index';
import { Post } from '../../redux/post/types';
interface Props {
  posts: Post[];
  user: any;
  loading: boolean;
}

class Dashboard extends Component<Props> {
  state = {};
  render() {
    return (
      <>
        <div className="p-0 container-fluid row">
          <div className="col-md-4">
            <Sidebar />
          </div>
          <div className="media mt-5 col-md-6 offset-xl-1 p-4 border border-primary post">
            <img
              className="mr-3 profile"
              src={this.props.user.image}
              alt="..."
            />
            <span className="text-primary h4">
              {this.props.user.first_name} {this.props.user.last_name}{' '}
            </span>
            <span className="badge bg-dark">{new Date().toTimeString()}</span>
            <div className="media-body mt-3">
              <Editor />
            </div>
          </div>
          <h2 className="col-md-6 offset-md-5 mt-5">Latest Posts</h2>
        </div>
        {this.props.loading ? (
          <div>Loading...</div>
        ) : (
          <div className="container-fluid row mt-5">
            {this.props.posts.map((post) => (
              <PostMedia post={post} key={post.id} />
            ))}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  posts: state.post.posts,
  user: state.auth.user,
  loading: state.post.loading,
});

export default connect(mapStateToProps)(Dashboard);
