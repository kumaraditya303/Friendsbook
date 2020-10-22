import React, { Component } from "react";
import { connect } from "react-redux";
import Editor from "../../components/Editor/index";
import { RootState } from "../../redux/index";
import { Post } from "../../redux/post/types";

interface Props {
  posts: Post[];
  user: any;
}

class Dashboard extends Component<Props> {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="media">
          <img
            className="align-self-start mt-5 mr-3 mb-5 profile"
            src={this.props.user.image}
            alt="..."
            style={{
              display: "inline",
            }}
          />
          <span className="align-self-end ml-3 username">
            {this.props.user.first_name} {this.props.user.last_name}
          </span>

          <div className="media-body ml-5">
            <div className="mt-0">Post...</div>
            <Editor />
          </div>
        </div>
        {this.props.posts.map((post) => (
          <div key={post.id} className="media">
            <img
              className="align-self-start mt-5 mr-3 mb-5 profile"
              src={post.user.image}
              alt="..."
              style={{
                display: "inline",
              }}
            />
            <span className="align-self-end ml-3 username">
              {post.user.first_name} {post.user.last_name}
            </span>
            <div
              className="media-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {post.images.length > 0 && (
              <div
                id={`carouselControls${post.id}`}
                className="carousel slide row col-6 mb-5"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  {post.images.map((file) => (
                    <div
                      className={
                        post.images[0] === file
                          ? "carousel-item active"
                          : "carousel-item"
                      }
                      key={file.id}
                    >
                      <img
                        key={file.image}
                        src={file.image}
                        alt="..."
                        className="d-block w-100"
                      />
                    </div>
                  ))}
                </div>
                <a
                  className="carousel-control-prev"
                  href={`#carouselControls${post.id}`}
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                </a>
                <a
                  className="carousel-control-next"
                  href={`#carouselControls${post.id}`}
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  posts: state.post.posts,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
