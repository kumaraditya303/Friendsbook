import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";
import { createPost } from "../../redux/post/actions";
class Editor extends Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable().use(linkify);
    this.state = {
      files: [],
      value: "Hello, **World**!",
    };
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  getMarkup = () => {
    return { __html: this.md.render(this.state.value) };
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createPost(
      this.md.render(this.state.value),
      this.state.files || []
    );
  };

  handleFileChange = (event) => {
    event.preventDefault();
    this.setState({ files: [...event.target.files] });
  };

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.handleSubmit}
          method="post"
          className="row mb-5 col-6"
        >
          <textarea
            className="form-control"
            name="content"
            cols={30}
            rows={3}
            defaultValue={this.state.value}
            onChange={this.handleChange}
          ></textarea>

          <input
            className="form-control"
            type="file"
            name="images"
            multiple
            onChange={this.handleFileChange}
          />

          <div
            className="container-fluid mt-5"
            dangerouslySetInnerHTML={this.getMarkup()}
          />

          {this.state.files.length > 0 && (
            <div
              id="carouselControls"
              className="row carousel slide mb-5"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                {this.state.files.map((file) => (
                  <div
                    className={
                      this.state.files[0].name === file.name
                        ? "carousel-item active"
                        : "carousel-item"
                    }
                    key={file.name}
                  >
                    <img
                      key={file.name}
                      src={URL.createObjectURL(file)}
                      alt="..."
                      className="d-block w-100"
                    />
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselControls"
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
                href="#carouselControls"
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
          <input
            type="submit"
            value="Post"
            className="btn btn-primary btn-block mb-5"
          />
        </form>
      </div>
    );
  }
}

Editor.propTypes = {
  createPost: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  createPost: (content, files) => dispatch(createPost(content, files)),
});

export default connect(null, mapDispatchToProps)(Editor);
