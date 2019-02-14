import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route } from "react-router-dom"

import App from "components/App"
import Signin from "components/Auth/Signin"
import Home from "components/Home"

import 'assets/sass/style.sass'


ReactDOM.render(
  <HashRouter>
    <App>
      <Route path="/" component={Signin} exact/>
      <Route path="/signin" component={Signin} />
      <Route path="/home" component={Home} />
    </App>
  </HashRouter>,
  document.getElementById("root")
)
