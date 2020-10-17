export const LOGIN_URL = `/api/login/`;
export const LOGOUT_URL = `/api/logout/`;
export const REGISTRATION_URL = `/api/register/`;
export const POST_URL = `/api/post/`;
export const POST_CREATE_URL = `/api/post/create/`;
export const POST_UPDATE_URL = (id: number): string =>
	`/api/post/update/${id}/`;
export const POST_DELETE_URL = (id: number): string =>
	`/api/post/delete/${id}/`;
