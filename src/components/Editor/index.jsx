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

  getMarkup = () => ({ __html: this.md.render(this.state.value) });

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

  resetForm = () => {
    this.setState({ files: [], content: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} method="post" className="mb-1">
        <textarea
          className="form-control"
          name="content"
          cols={30}
          rows={3}
          defaultValue={this.state.value}
          onChange={this.handleChange}
          placeholder="Write a post in Markdown"
        ></textarea>
        <div className="form-file">
          <input
            className="form-file-input"
            type="file"
            name="images"
            multiple
            onChange={this.handleFileChange}
            id="customFile"
          />
          <label className="form-file-label" htmlFor="customFile">
            <span className="form-file-text">
              Choose{" "}
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-card-image"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14.5 3h-13a.5.5 0 0 0-.5.5v9c0 .013 0 .027.002.04V12l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15 9.499V3.5a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm4.502 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                />
              </svg>
            </span>
            <span className="form-file-button">Browse</span>
          </label>
        </div>
        <br />
        <h3>Preview</h3>
        <div
          className="container mt-3"
          dangerouslySetInnerHTML={this.getMarkup()}
        />

        {this.state.files.length > 0 && (
          <div
            id="carouselControls"
            className="carousel slide mb-5 border-primary"
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
        <div className="row justify-content-evenly mt-4">
          <button type="submit" className="col-2 btn btn-primary">
            Post
          </button>
          <button
            type="reset"
            className="col-2 btn btn-primary align-self-end"
            onClick={this.resetForm}
          >
            Reset{" "}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-left-circle-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"
              />
            </svg>
          </button>
        </div>
      </form>
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
