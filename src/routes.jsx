import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const Hoc = props => props.children;

const Router = () => (
  <Hoc>
    <Route exact path="/login/:next?" component={Login} />
    <Route exact path='/register/:next?' component={Register} />
  </Hoc>
);

export default Router;
