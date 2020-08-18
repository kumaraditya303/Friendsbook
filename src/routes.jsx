import React from "react";
import { Route } from "react-router-dom";

import Layout from './components/Layout'

export const Hoc = props => props.children;


const Router = () => (
  <Hoc>
    <Route path="/" component={Layout} />
  </Hoc>
);

export default Router;
