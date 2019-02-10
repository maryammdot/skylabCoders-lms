import React, { Component } from 'react'
import auth from 'services/auth'

class Signin extends Component {

    state = { email: '', password: '', error: null }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    handleSubmit = async (event) => {
        event.preventDefault()
        const {email, password} = this.state
        try {
            await auth.login({email, password})
            this.props.history.push('/home')
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    render () {
        const { state: {error}, handleChange, handleSubmit } = this
        return <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                <button type="submit">Entrar</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default Signin