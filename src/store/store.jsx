import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import postReducer from './reducers/posts';

const rootReducer = combineReducers({
	auth: authReducer,
	post: postReducer,
});
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));
export default store;
