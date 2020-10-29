import { AuthAction, AuthActionType, AuthState } from "./types"

const State: AuthState = {
  authenticated:
    typeof window !== `undefined` && localStorage.getItem("token") !== null,
  error: null,
  loading: false,
  user:
    typeof window !== `undefined` && JSON.parse(localStorage.getItem("token")),
}

const reducer = (state = State, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.START:
      return {
        ...state,
        error: null,
        loading: true,
        authenticated: action.authenticated,
      }
    case AuthActionType.SUCCESS:
      return {
        ...state,
        authenticated: action.authenticated,
        loading: false,
        user: action.user,
      }
    case AuthActionType.FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        authenticated: action.authenticated,
      }
    case AuthActionType.LOGOUT:
      return { ...state, user: {}, authenticated: action.authenticated }
    default:
      return state
  }
}

export default reducer
