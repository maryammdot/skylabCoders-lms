import React, { Component } from 'react'
import Exercise from 'services/admin/exercise'


import { diff as DiffEditor } from 'react-ace';

import 'brace/mode/javascript'
import 'brace/snippets/javascript'
import 'brace/theme/github'

class EditExercise extends Component {

    state = {title: '', diffCode: ['', ''], message: null, error: null}

    exerciseId = this.props.match.params.exerciseId

    componentDidMount() {
        this.getExercise()
    }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    correctExercise = async postData => {
        try {
            const message = await Exercise.correct(postData)
            this.setState({message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    getExercise = async () => {
        const {exerciseId} = this
        try {
            const {title, tema_id, code, code_admin_correction} = await Exercise.retrieve({exerciseId})
            this.setState({title, tema_id, diffCode: [`${code}`, `${code_admin_correction}`]})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const {state: {title, tema_id, diffCode: [ ,code_admin_correction]}, correctExercise, exerciseId} = this
        correctExercise({title, tema_id, code_admin_correction, exerciseId})
    }

    handleCodeChange = ([,admin]) => {
        const [student, ] = this.state.diffCode 
        this.setState({diffCode: [student, admin]})
    }
    

    render () {
        const { state: {title, diffCode, error, message}, handleChange, handleSubmit, handleCodeChange } = this
        return <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={title} placeholder="Description" onChange={handleChange}/>
                <DiffEditor
                    value={diffCode}
                    width="100%"
                    onChange={handleCodeChange}
                    mode="javascript"
                    fontSize={14}
                    editorProps={{$blockScrolling: true}}
                    setOptions={{tabSize: 2}}
                    spellcheck={true}
                    wrapEnabled={true}
                    theme="monokai"
                />
                <button type="submit">Correct Exercise</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default EditExercise