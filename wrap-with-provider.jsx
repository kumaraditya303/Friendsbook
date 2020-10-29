import React from "react"
import { Provider } from "react-redux"
import store from "./src/redux"

export default ({ element }) => <Provider store={store}>{element}</Provider>
