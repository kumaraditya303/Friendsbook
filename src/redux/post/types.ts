export enum PostAction {
	POST_START,
	POST_FAIL,
	POST_SUCCESS,
}
export interface PostActionType {
	type: PostAction;
	posts: Post[];
	error?: string | null;
}

export interface Post {
	content: string;
	created: string;
	images: any;
}

export interface PostState {
	posts: Post[];
	error?: string | null;
	loading: boolean;
}
