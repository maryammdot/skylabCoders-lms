import React, { Component } from 'react'
import Exercise from 'services/student/exercise'

class AddExercise extends Component {

    state = {title: '', theme: 0, code: '', message: null, error: null}

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    addExercise = async postData => {
        try {
            const message = await Exercise.add(postData)
            this.setState({message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        const {state: {title, theme, code}, addExercise} = this
        addExercise({title, theme, code})
    }

    render () {
        const { state: {error, message}, handleChange, handleSubmit } = this
        return <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Description" onChange={handleChange}/>
                <input type="number" name="theme" placeholder="Tema" onChange={handleChange}/>
                <textarea type="text" rows="4" cols="50" name="code" placeholder="Put your code here" onChange={handleChange}/>
                <button type="submit">Add Exercise</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default AddExercise