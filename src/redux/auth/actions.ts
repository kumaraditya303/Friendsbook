import axios from "axios"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { LOGIN_URL, REGISTRATION_URL } from "../../utils/constants"
import { AuthAction, AuthActionType, AuthState } from "./types"

export const logout = (): ThunkAction<
  void,
  AuthState,
  undefined,
  AuthAction
> => (dispatch: ThunkDispatch<AuthState, undefined, AuthAction>) => {
  typeof window !== `undefined` && localStorage.clear()
  dispatch({ type: AuthActionType.LOGOUT, authenticated: false })
}

export const login = (
  email: string,
  password: string
): ThunkAction<void, AuthState, undefined, AuthAction> => (
  dispatch: ThunkDispatch<AuthState, undefined, AuthAction>
) => {
  dispatch({ type: AuthActionType.START, authenticated: false })
  axios
    .post(LOGIN_URL, {
      username: email,
      password,
    })
    .then(res => {
      const token = res.data.token
      const user = res.data.user
      typeof window !== `undefined` &&
        localStorage.setItem("user", JSON.stringify(user))
      typeof window !== `undefined` && localStorage.setItem("token", token)
      dispatch({ type: AuthActionType.SUCCESS, authenticated: true, user })
    })
    .catch(error => {
      dispatch({ type: AuthActionType.FAIL, error, authenticated: false })
    })
}

export const register = (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  dob: string
): ThunkAction<void, AuthState, undefined, AuthAction> => (
  dispatch: ThunkDispatch<AuthState, undefined, AuthAction>
) => {
  dispatch({ type: AuthActionType.START, authenticated: false })
  axios
    .post(REGISTRATION_URL, {
      first_name,
      last_name,
      email,
      password,
      dob,
    })
    .then(res => {
      if (res.status === 201) dispatch(login(email, password))
    })
    .catch(error => {
      dispatch({ type: AuthActionType.FAIL, error, authenticated: false })
    })
}

export const autoLogin = (): ThunkAction<
  void,
  AuthState,
  undefined,
  AuthAction
> => (dispatch: ThunkDispatch<AuthState, undefined, AuthAction>) => {
  dispatch({ type: AuthActionType.START, authenticated: false })
  const authenticated =
    typeof window !== `undefined` && localStorage.getItem("token")
  const user = JSON.parse(
    typeof window !== `undefined` && localStorage.getItem("user")
  )
  if (authenticated)
    dispatch({ type: AuthActionType.SUCCESS, authenticated: true, user })
  else
    dispatch({ type: AuthActionType.FAIL, error: null, authenticated: false })
}
