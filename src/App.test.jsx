import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./App";
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth'


const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
