import React, { Component } from 'react'
import Promotions from 'services/admin/promotions'


class EditPromotion extends Component {

    state = { name: '', initialDate: '', endDate: '', message: null, error: null }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    format = date => date.replace(/\//g, '-'); 

    componentDidMount() {
        this.getPromotion()
    }

    getPromotion = async () => {
        try {
            const {match: {params: {promotionId}}} = this.props
            const {name, initialDate, endDate} = await Promotions.retrieve(promotionId)
            this.setState({name, initialDate: this.format(initialDate), endDate: this.format(endDate)})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const {name, initialDate, endDate} = this.state
        try {
            const message = await Promotions.edit({name, year: `${initialDate}/${endDate}`})
            this.setState({message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    render () {
        const { state: {name, initialDate, endDate, error, message}, handleChange, handleSubmit } = this
        return <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} name="name" placeholder="Promotion name" onChange={handleChange}/>
                <input type="date" value={initialDate} name="initialDate" placeholder="Initial date" onChange={handleChange}/>
                <input type="date" value={endDate} name="endDate" placeholder="End date" onChange={handleChange}/>
                <button type="submit">Edit Promotion</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    }

}

export default EditPromotion