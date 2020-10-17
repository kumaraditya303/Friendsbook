import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export enum AuthAction {
	START = 'AUTH_START',
	SUCCESS = 'AUTH_SUCCESS',
	FAIL = 'AUTH_FAIL',
	LOGOUT = 'AUTH_LOGOUT',
}

export interface AuthActionType extends Action<AuthAction> {
	authenticated: boolean;
	error?: string | null;
	user?: Record<string, unknown>;
}

export type AuthState = {
	authenticated: boolean;
	loading: boolean;
	error?: string | null;
	user?: Record<string, unknown>;
};
export type ThunkResult<R> = ThunkAction<
	R,
	AuthState,
	undefined,
	AuthActionType
>;
