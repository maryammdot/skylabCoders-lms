import React, { Component } from 'react'
import Tema from 'services/admin/tema'


class EditPromotion extends Component {

    state = { name: '', number: '', message: null, error: null }

    temaId = this.props.match.params.temaId

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    componentDidMount() {
        this.getTema()
    }

    getTema = async () => {
        const {temaId} = this
        try {
            const tema = await Tema.retrieve({temaId})
            this.setState(tema)
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    editTema = async postData => {
        try {
            const {tema: {name, number}, message} = await Tema.edit(postData)
            this.setState({name, number, message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const {state: {name, number}, editTema, temaId} = this
        editTema({name, number, temaId})
    }

    render () {
        const { state: {name, number, error, message}, handleChange, handleSubmit } = this
        return <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} name="name" placeholder="Tema name" onChange={handleChange}/>
                <input type="number" value={number} name="number" placeholder="Number" onChange={handleChange}/>
                <button type="submit">Edit Tema</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    }

}

export default EditPromotion