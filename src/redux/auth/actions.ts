import axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LOGIN_URL, REGISTRATION_URL } from '../../constants';
import { AuthAction, AuthActionType, AuthState } from './types';

export const logout = (): ThunkAction<
  void,
  AuthState,
  undefined,
  AuthAction
> => (dispatch: ThunkDispatch<AuthState, undefined, AuthAction>) => {
  localStorage.clear();
  dispatch({ type: AuthActionType.LOGOUT, authenticated: false });
};

export const login = (
  email: string,
  password: string
): ThunkAction<void, AuthState, undefined, AuthAction> => (
  dispatch: ThunkDispatch<AuthState, undefined, AuthAction>
) => {
  dispatch({ type: AuthActionType.START, authenticated: false });
  axios
    .post(LOGIN_URL, {
      username: email,
      password,
    })
    .then((res) => {
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      dispatch({ type: AuthActionType.SUCCESS, authenticated: true, user });
    })
    .catch((error) => {
      dispatch({ type: AuthActionType.FAIL, error, authenticated: false });
    });
};

export const register = (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  dob: string
): ThunkAction<void, AuthState, undefined, AuthAction> => (
  dispatch: ThunkDispatch<AuthState, undefined, AuthAction>
) => {
  dispatch({ type: AuthActionType.START, authenticated: false });
  axios
    .post(REGISTRATION_URL, {
      first_name,
      last_name,
      email,
      password,
      dob,
    })
    .then((res) => {
      if (res.status === 201) dispatch(login(email, password));
    })
    .catch((error) => {
      dispatch({ type: AuthActionType.FAIL, error, authenticated: false });
    });
};
