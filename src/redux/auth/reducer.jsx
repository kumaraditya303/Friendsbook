import {
	AUTH_FAIL,
	AUTH_LOGOUT,
	AUTH_START,
	AUTH_SUCCESS,
} from './types';

const initialState = {
	authenticated: false,
	error: null,
	loading: false,
	user: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_START:
			return { ...state, error: null, loading: true };
		case AUTH_SUCCESS:
			return {
				...state,
				authenticated: true,
				loading: false,
				user: action.user,
			};
		case AUTH_FAIL:
			return { ...state, error: action.error, loading: false };
		case AUTH_LOGOUT:
			return { ...state, authenticated: false, user: {} };
		default:
			return state;
	}
};

export default reducer;
