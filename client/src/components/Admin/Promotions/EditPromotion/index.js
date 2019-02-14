import React, { Component } from 'react'
import Promotion from 'services/admin/promotion'


class EditPromotion extends Component {

    state = { name: '', season: '', message: null, error: null }

    promotionId = this.props.match.params.promotionId

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    componentDidMount() {
        this.getPromotion()
    }

    getPromotion = async () => {
        const {promotionId} = this
        try {
            const promotion = await Promotion.retrieve({promotionId})
            this.setState(promotion)
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    editPromotion = async postData => {
        try {
            const {promotion: {name, season}, message} = await Promotion.edit(postData)
            this.setState({name, season, message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const {state: {name, season}, editPromotion, promotionId} = this
        editPromotion({name, season, promotionId})
    }

    render () {
        const { state: {name, season, error, message}, handleChange, handleSubmit } = this
        return <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} name="name" placeholder="Promotion name" onChange={handleChange}/>
                <input type="text" value={season} name="season" placeholder="Season" onChange={handleChange}/>
                <button type="submit">Edit Promotion</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    }

}

export default EditPromotion