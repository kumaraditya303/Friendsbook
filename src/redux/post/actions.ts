import { POST_URL } from '../../constants';
import { PostAction } from './types';
import axios from '../../utils/axios';
import { Dispatch } from 'redux';

export const fetchPosts = () => (dispatch: Dispatch) => {
	dispatch({ type: PostAction.POST_START });
	axios
		.get(POST_URL)
		.then((res) => dispatch({ type: PostAction.POST_SUCCESS, posts: res.data }))
		.catch((error) => dispatch({ type: PostAction.POST_FAIL, error }));
};
