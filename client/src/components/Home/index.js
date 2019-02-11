import React, { Component, Fragment } from "react"

import Menu from "components/Menu"
import Dashboard from "components/Dashboard"
import requireAuth from "components/middlewares/requireAuth"

class Home extends Component {
  render() {
    return <Fragment>
        <Menu />
        <Dashboard />
    </Fragment>
  }
}

export default requireAuth(Home)
