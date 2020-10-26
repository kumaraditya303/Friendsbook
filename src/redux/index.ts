import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import postReducer from './post/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof store.getState>;
export default store;
