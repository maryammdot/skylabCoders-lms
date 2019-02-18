import React, { Component } from 'react'
import Exercise from 'services/student/exercise'


import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/monokai'

class EditExercise extends Component {

    state = {temas: [], title: '', tema_id: '', code: '', message: null, error: null}

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
            const {title, tema_id, code} = await Exercise.retrieve({exerciseId})
            this.setState({title, tema_id, code})
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const {state: {title, tema_id, code}, editExercise, exerciseId} = this
        editExercise({title, tema_id, code, exerciseId})
    }

    handleCodeChange = code =>  this.setState({code})

    render () {
        const { state: {temas, tema_id, title, code, error, message}, handleChange, handleSubmit, handleCodeChange } = this
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
                <AceEditor
                    onChange={handleCodeChange}
                    mode="javascript"
                    theme="monokai"
                    name="code2"
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    editorProps={{$blockScrolling: true}}
                    value={code}
                    setOptions={{tabSize: 2}}/>
                <button type="submit">Edit Exercise</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default EditExercise