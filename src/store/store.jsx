import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
const rootReducer = combineReducers({
	auth: authReducer,
});
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default store;
