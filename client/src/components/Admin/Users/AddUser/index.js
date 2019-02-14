import React, { Component } from 'react'
import User from 'services/admin/user'
import Promotion from 'services/admin/promotion'

class AddStudent extends Component {

    state = { 
        promotions: [], 
        email: '', 
        username: '', 
        promotion_id: 0, 
        password: '', 
        password_confirmation: '', 
        message: null, 
        error: null 
    }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    componentDidMount() {
        this.getPromotions()
    }

    addUser= async postData => {
        try {
            const message = await User.add(postData)
            this.setState({message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    getPromotions = async () => {
        try {
            const promotions = await Promotion.getAll()
            this.setState({ promotions })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        const {state: {email, username, promotion_id, password, password_confirmation}, addUser} = this
        addUser({email, username, promotion_id, password, password_confirmation})
    }

    render () {
        const { state: {promotions, promotion_id, error, message}, handleChange, handleSubmit } = this
        return <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
                <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                <input type="text" name="password_confirmation" placeholder="Confirm your password" onChange={handleChange}/>
                <select name="promotion_id" value={promotion_id} onChange={handleChange}>
                    {
                        promotions.length 
                        ?
                            promotions.map(promotion => <option key={promotion.id} value={promotion.id}>{promotion.name}</option>)
                        :
                        <option>No promotions yet</option>
                    }
                </select>
                <button type="submit">Add User</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default AddStudent