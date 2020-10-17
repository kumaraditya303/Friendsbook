import { AuthAction, AuthActionType, AuthState } from './types';

const State: AuthState = {
	authenticated: false,
	error: null,
	loading: false,
	user: {},
};

const reducer = (state = State, action: AuthActionType): AuthState => {
	switch (action.type) {
		case AuthAction.START:
			return {
				...state,
				error: null,
				loading: true,
				authenticated: action.authenticated,
			};
		case AuthAction.SUCCESS:
			return {
				...state,
				authenticated: action.authenticated,
				loading: false,
				user: action.user,
			};
		case AuthAction.FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
				authenticated: action.authenticated,
			};
		case AuthAction.LOGOUT:
			return { ...state, user: {}, authenticated: action.authenticated };
		default:
			return state;
	}
};

export default reducer;
