import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import authReducer from "./store/reducers/auth";



const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
