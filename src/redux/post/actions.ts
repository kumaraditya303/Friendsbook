import {ThunkDispatch} from 'redux-thunk';
import {POST_URL} from '../../constants';
import axios from '../../utils/axios';
import {PostAction, PostActionType, PostState, ThunkResult} from './types';

export const fetchPosts = (): ThunkResult<void> => (dispatch: ThunkDispatch<PostState,undefined,PostActionType>) => {
	dispatch({ type: PostAction.START });
	axios
		.get(POST_URL)
		.then((res: any) => dispatch({ type: PostAction.SUCCESS, posts: res.data }))
		.catch((error: string) => dispatch({ type: PostAction.FAIL, error }));
};
