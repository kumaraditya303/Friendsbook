import {
	POST_CREATE,
	POST_DELETE,
	POST_FAIL,
	POST_START,
	POST_UPDATE,
} from '../actionTypes';

const initialState = {
	posts: [],
	error: null,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_START:
			return { ...state, loading: true };
		case POST_CREATE:
		case POST_UPDATE:
		case POST_DELETE:
			return { ...state, posts: action.posts, loading: false };
		case POST_FAIL:
			return { ...state, error: action.error, loading: false };
		default:
			return state;
	}
};
export default reducer;
