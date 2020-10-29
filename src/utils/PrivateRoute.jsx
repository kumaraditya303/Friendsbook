import { navigate } from "gatsby"
import { connect } from "react-redux"
import { compose } from "redux"
import React from "react"
const PrivateRoute = Component => props => {
  const { authenticated, ...rest } = props
  if (!authenticated && typeof window !== `undefined`) {
    navigate(`/login`)
    return null
  }
  return <Component {...rest} />
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated })

export default compose(connect(mapStateToProps, null), PrivateRoute)
