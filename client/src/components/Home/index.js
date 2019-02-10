import React, { Component } from "react"

import requireAuth from "components/Auth/requireAuth"

class Home extends Component {
  render() {
    return <p>Welcome!</p>
  }
}

export default requireAuth(Home)
