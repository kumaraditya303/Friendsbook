import { PostAction, PostActionType, PostState } from './types';

const State: PostState = {
  posts: [],
  error: null,
  loading: false,
};

const reducer = (state = State, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionType.START:
      return { ...state, loading: true };
    case PostActionType.SUCCESS:
      return { ...state, posts: action.posts, loading: false };
    case PostActionType.FAIL:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
