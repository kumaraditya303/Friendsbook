import {Action} from 'redux';

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
