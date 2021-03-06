import React, { Component } from 'react'
import Exercise from 'services/student/exercise'

import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/monokai'

class AddExercise extends Component {

    state = {temas: [], title: '', tema_id: '', code: '', message: null, error: null}

    componentDidMount() {
        this.getTemas()
    }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value})

    addExercise = async postData => {
        try {
            const message = await Exercise.add(postData)
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

    handleSubmit = async event => {
        event.preventDefault()
        const {state: {title, tema_id, code}, addExercise} = this
        addExercise({title, tema_id, code})
    }

    handleCodeChange = code =>  this.setState({code})

    render () {
        const { state: {temas, tema_id, error, message, code}, handleChange, handleSubmit, handleCodeChange } = this
        return <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Description" onChange={handleChange}/>
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
                    name="code"
                    fontSize={14}
                    value={code}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    editorProps={{$blockScrolling: true}}
                    setOptions={{tabSize: 2}}/>
                <button type="submit">Add Exercise</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    }

}

export default AddExercise