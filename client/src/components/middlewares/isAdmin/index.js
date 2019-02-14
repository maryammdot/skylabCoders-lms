import React, { Component, Fragment } from 'react'
import store from "plugins/store"

export default ChildComponent => {

    class ComposedCompoent extends Component {

        componentDidMount() {
            this.shouldNavigateAway()
        }

        componentDidUpdate() {
            this.shouldNavigateAway()
        }

        shouldNavigateAway() {
            if (!store.isAdmin()) this.props.history.push('/')
        }

        renderChilds() {
            return (store.isAdmin()) ? <ChildComponent {...this.props} /> : null
        }

        render() {
            return <Fragment>{this.renderChilds()}</Fragment>
        }

    }

    return ComposedCompoent

}