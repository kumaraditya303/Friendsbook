import React, { Component } from "react";
import { connect } from "react-redux";
import Editor from "../../components/Editor/index.jsx";
import { RootState } from "../../redux/index.js";
import { Post } from "../../redux/post/types.js";

interface Props {
  posts: Post[];
  user: any;
}

class Dashboard extends Component<Props> {
  state = {};
  render() {
    return (
      <>
        <div className="container">
          <div className="media">
            <img
              className="align-self-start mr-3"
              src={this.props.user.image}
              alt="Generic placeholder image"
            ></img>
            <div className="media-body">
              <div className="mt-0">Post Something...</div>
              <Editor />
            </div>
          </div>
          <div className="media">
            <img
              className="align-self-start mr-3"
              src="..."
              alt="Generic placeholder image"
            />
            <div className="media-body">
              <h5 className="mt-0">Top-aligned media</h5>
              <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue felis in
                faucibus.
              </p>
              <p>
                Donec sed odio dui. Nullam quis risus eget urna mollis ornare
                vel eu leo. Cum sociis natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus.
              </p>
            </div>
          </div>
          {this.props.posts.map((post) => (
            <div key={post.id}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              {post.images.map((image) => (
                <img key={image.id} src={image.image} alt="..." />
              ))}
            </div>
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
