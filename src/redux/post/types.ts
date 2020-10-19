import { Action } from 'redux';
export interface Image {
	id: number;
	image: string;
	created: string;
}

export interface Post {
	id: number;
	content: string;
	created: string;
	images?: Image[];
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
