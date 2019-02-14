import React, { Component } from 'react'
import Promotion from 'services/admin/promotion'

class AddPromotion extends Component {

    state = { name: '', season: '', message: null, error: null }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    addPromotion = async postData => {
        try {
            const message = await Promotion.add(postData)
            this.setState({message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        const {state: {name, season}, addPromotion} = this
        addPromotion({name, season})
    }

    render () {
        const { state: {error, message}, handleChange, handleSubmit } = this
        return <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Promotion name" onChange={handleChange}/>
                <input type="text" name="season" placeholder="Season" onChange={handleChange}/>
                <button type="submit">Add Promotion</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default AddPromotion