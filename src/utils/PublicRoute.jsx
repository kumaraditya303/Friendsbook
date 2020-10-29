import { navigate } from "gatsby"
import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
const PublicRoute = Component => props => {
  const { authenticated, ...rest } = props
  if (authenticated && typeof window !== `undefined`) {
    navigate(`/`)
    return null
  }
  return <Component {...rest} />
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated })

export default compose(connect(mapStateToProps, null), PublicRoute)
