import React from "react"
import { Post } from "../../redux/post/types"

interface Props {
  post: Post
}

const PostMedia: React.FC<Props> = (props: Props) => (
  <div className="media col-md-6 offset-md-5 p-4 border border-primary mb-5 post">
    <img className="mr-3 profile" src={props.post.user.image} alt="..." />
    <span className="text-primary h4">
      {props.post.user.first_name} {props.post.user.last_name}{" "}
    </span>
    <span className="badge bg-dark">
      {new Date(props.post.created).toTimeString()}
    </span>
    <div className="media-body mt-2 offset-2">
      <div dangerouslySetInnerHTML={{ __html: props.post.content }} />
    </div>
    {props.post.images.length > 0 && (
      <div
        id={`carouselControls${props.post.id}`}
        className="carousel slide mb-5"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {props.post.images.map(file => (
            <div
              className={
                props.post.images[0] === file
                  ? "carousel-item active"
                  : "carousel-item"
              }
              key={file.id}
            >
              <img
                key={file.id}
                src={file.image}
                alt="..."
                className="d-block w-100"
              />
            </div>
          ))}
        </div>
        {props.post.images.length > 1 && (
          <>
            <a
              className="carousel-control-prev"
              href={`#carouselControls${props.post.id}`}
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
              href={`#carouselControls${props.post.id}`}
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </a>
          </>
        )}
      </div>
    )}
  </div>
)

export default PostMedia
