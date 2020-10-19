import React, {Component} from 'react';
import {connect} from 'react-redux';
import Editor from '../../components/Editor/index.jsx';
import {RootState} from '../../redux/index.js';
import {Post} from '../../redux/post/types.js';

interface Props {
  posts: Post[];
}

class Dashboard extends Component<Props> {
  state = {};
  render() {
    return (
      <>
        <Editor />
        {this.props.posts.map(post =>
          <div key={post.id}>
            <div dangerouslySetInnerHTML={{__html: post.content}} />
            {post.images.map(image =>
              <img key={image.id} src={image.image} alt="..." />
            )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  posts: state.post.posts
});


export default connect(mapStateToProps)(Dashboard);
