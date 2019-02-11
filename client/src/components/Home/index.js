import React, { Component } from "react"

import requireAuth from "components/middlewares/requireAuth"

class Home extends Component {
  render() {
    return <p>Welcome!</p>
  }
}

export default requireAuth(Home)
