import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";


export const Hoc = props => props.children;


const Router = () => (

  <Route exact path='/login' component={Login} />

);

export default Router;
