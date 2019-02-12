import React, { Component } from 'react'
import Promotions from 'services/admin/promotions'

class AddPromotion extends Component {

    state = { name: '', initialDate: '', endDate: '', message: null, error: null }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    handleSubmit = async (event) => {
        event.preventDefault()
        const {name, initialDate, endDate} = this.state
        try {
            const message = await Promotions.add({name, year: `${initialDate}/${endDate}`})
            this.setState({message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    render () {
        const { state: {error, message}, handleChange, handleSubmit } = this
        return <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Promotion name" onChange={handleChange}/>
                <input type="date" name="initialDate" placeholder="Initial date" onChange={handleChange}/>
                <input type="date" name="endDate" placeholder="End date" onChange={handleChange}/>
                <button type="submit">Add Promotion</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    }

}

export default AddPromotion