import {PostAction, PostActionType, PostState} from './types';

const State: PostState = {
  posts: [],
  error: null,
  loading: false,
};

const reducer = (state = State, action: PostActionType): PostState => {
  switch (action.type) {
    case PostAction.START:
      return {...state, loading: true};
    case PostAction.SUCCESS:
      return {...state, posts: action.posts, loading: false};
    case PostAction.FAIL:
      return {...state, error: action.error, loading: false};
    default:
      return state;
  }
};

export default reducer;
