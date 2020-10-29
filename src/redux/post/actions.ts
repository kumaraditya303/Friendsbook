import { ThunkAction, ThunkDispatch } from "redux-thunk"
import axios from "../../utils/axios"
import { POST_CREATE_URL, POST_URL } from "../../utils/constants"
import { PostAction, PostActionType, PostState } from "./types"

export const fetchPosts = (): ThunkAction<
  void,
  PostState,
  undefined,
  PostAction
> => (dispatch: ThunkDispatch<PostState, undefined, PostAction>) => {
  dispatch({ type: PostActionType.START })
  axios
    .get(POST_URL)
    .then(res => dispatch({ type: PostActionType.SUCCESS, posts: res.data }))
    .catch(error => dispatch({ type: PostActionType.FAIL, error }))
}

/**
 * Function to create a post
 * @param content Markdown Content
 * @param files Images to be posted
 */

export const createPost = (
  content: string,
  files?: File[]
): ThunkAction<void, PostState, undefined, PostAction> => (
  dispatch: ThunkDispatch<PostState, undefined, PostAction>
) => {
  dispatch({ type: PostActionType.START })

  const body: FormData = new FormData()
  let count = 0
  for (const file of files) {
    body.append(`image${++count}`, file)
  }
  body.append("content", content)

  axios
    .post(POST_CREATE_URL, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${
          typeof window !== `undefined` && localStorage.getItem("token")
        }`,
      },
    })
    .then(() => dispatch(fetchPosts()))
    .catch(error => dispatch({ type: PostActionType.FAIL, error }))
}
