import { POST_URL } from '../../constants';
import { POST_FAIL, POST_SUCCESS } from '../actionTypes';
import axios from '../axios';

export const fetchPosts = () => (dispatch) => {
	dispatch({ type: POST_START });
	axios
		.get(POST_URL)
		.then((res) => dispatch({ type: POST_SUCCESS, posts: res.data.posts }))
		.catch((error) => dispatch({ type: POST_FAIL, error }));
};
