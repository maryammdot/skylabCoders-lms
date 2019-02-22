import React, { Component } from 'react'

class State extends Component {

    
    render() {

        const { props: { exercises, name } } = this

        return <div className="trello__column" onDrop={e => this.props.update(e, name)} onDragOver={e => e.preventDefault()}>
            <h2>{name}</h2>
            {exercises}
        </div>
    }

}

export default State