import React, { Component } from 'react'
import auth from 'services/auth'
import isAuthenticated from "components/middlewares/isAuthenticated"

class Signin extends Component {

    state = { email: '', password: '', error: null }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    login = async postData => {
        try {
            await auth.login(postData)
            this.props.history.push('/home')
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const {state: {email, password}, login} = this
        login({email, password})
    }

    render () {
        const { state: {error}, handleChange, handleSubmit } = this
        return <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default isAuthenticated(Signin)