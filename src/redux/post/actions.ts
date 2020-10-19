import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { POST_CREATE_URL, POST_URL } from '../../constants';
import axios from '../../utils/axios';
import { PostAction, PostActionType, PostState } from './types';

export const fetchPosts = (): ThunkAction<
	void,
	PostState,
	undefined,
	PostActionType
> => (dispatch: ThunkDispatch<PostState, undefined, PostActionType>) => {
	dispatch({ type: PostAction.START });
	axios
		.get(POST_URL)
		.then((res) => dispatch({ type: PostAction.SUCCESS, posts: res.data }))
		.catch((error) => dispatch({ type: PostAction.FAIL, error }));
};

export const createPost = (
	content: string,
	files?: File[]
): ThunkAction<void, PostState, undefined, PostActionType> => (
	dispatch: ThunkDispatch<PostState, undefined, PostActionType>
) => {
	dispatch({ type: PostAction.START });

	const body: FormData = new FormData();
	let count = 0;
	for (const file of files) {
		body.append(`image${++count}`, file);
	}
	body.append('content', content);

	axios
		.post(POST_CREATE_URL, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(() => dispatch(fetchPosts()))
		.catch((error) => dispatch({ type: PostAction.FAIL, error }));
};
