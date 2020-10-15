import { PostAction, PostActionType, PostState } from './types';

const initialState: PostState = {
	posts: [],
	error: null,
	loading: false,
};

const reducer = (state = initialState, action: PostActionType): PostState => {
	switch (action.type) {
		case PostAction.POST_START:
			return { ...state, loading: true };
		case PostAction.POST_SUCCESS:
			console.log(action);
			return { ...state, posts: action.posts, loading: false };
		case PostAction.POST_FAIL:
			return { ...state, error: action.error, loading: false };
		default:
			return state;
	}
};

export default reducer;
