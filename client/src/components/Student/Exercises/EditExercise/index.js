import React, { Component } from 'react'
import Exercise from 'services/student/exercise'


import { diff as DiffEditor } from 'react-ace';

import 'brace/mode/javascript'
import 'brace/snippets/javascript'
import 'brace/theme/github'

class EditExercise extends Component {

    state = {temas: [], title: '', tema_id: '', diffCode: ['', ''], message: null, error: null}

    exerciseId = this.props.match.params.exerciseId

    componentDidMount() {
        this.getExercise()
        this.getTemas()
    }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    editExercise = async postData => {
        try {
            const message = await Exercise.edit(postData)
            this.setState({message})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    getTemas = async () => {
        try {
            const temas = await Exercise.getTemas()
            this.setState({ temas })
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
        const {state: {title, tema_id, diffCode: [code, ]}, editExercise, exerciseId} = this
        editExercise({title, tema_id, code, exerciseId})
    }

    handleCodeChange = diffCode => this.setState({diffCode})
    

    render () {
        const { state: {temas, tema_id, title, diffCode, error, message}, handleChange, handleSubmit, handleCodeChange } = this
        return <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={title} placeholder="Description" onChange={handleChange}/>
                <select name="tema_id" value={tema_id} onChange={handleChange}>
                    {
                        temas.length 
                        ?
                            temas.map(tema => <option key={tema.id} value={tema.id}>{tema.name}</option>)
                        :
                        <option>No temas yet</option>
                    }
                </select>
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
                <button type="submit">Edit Exercise</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default EditExercise