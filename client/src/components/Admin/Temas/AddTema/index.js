import React, { Component } from 'react'
import Tema from 'services/admin/tema'

class AddTema extends Component {

    state = { name: '', number: '', message: null, error: null }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    addTema = async postData => {
        try {
            const message = await Tema.add(postData)
            this.setState({message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        const {state: {name, number}, addTema} = this
        addTema({name, number})
    }

    render () {
        const { state: {error, message}, handleChange, handleSubmit } = this
        return <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Tema name" onChange={handleChange}/>
                <input type="number" min="1" name="number" placeholder="Number" onChange={handleChange}/>
                <button type="submit">Add Tema</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default AddTema