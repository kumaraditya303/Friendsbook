import {
	applyMiddleware,
	combineReducers,
	compose,
	createStore,
	Store,
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import postReducer from './post/reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	post: postReducer,
});

const composeEnhances =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store = createStore(
	rootReducer,
	composeEnhances(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof rootReducer>;
export default store;
