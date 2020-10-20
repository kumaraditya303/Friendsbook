import { Action } from "redux";

export enum AuthActionType {
  START = "AUTH_START",
  SUCCESS = "AUTH_SUCCESS",
  FAIL = "AUTH_FAIL",
  LOGOUT = "AUTH_LOGOUT",
}

export interface AuthAction extends Action<AuthActionType> {
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
