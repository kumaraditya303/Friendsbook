import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface Post {
	content: string;
	created: string;
	images: any;
}
export enum PostAction {
	START = 'POST_START',
	FAIL = 'POST_FAIL',
	SUCCESS = 'POST_SUCCESS',
}
export interface PostActionType extends Action {
	type: PostAction;
	posts?: Post[];
	error?: string | null;
}

export type PostState = {
	posts: Post[];
	error?: string | null;
	loading: boolean;
};

export type ThunkResult<R> = ThunkAction<
	R,
	PostState,
	undefined,
	PostActionType
>;
