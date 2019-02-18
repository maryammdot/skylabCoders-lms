import React, { Component } from 'react'
import Tema from 'services/admin/tema'
import TemaCard from 'components/Admin/Temas/AllTemas/TemaCard'

class AllTemas extends Component {

    state = { temas: [], message: null, error: null }

    componentDidMount() {
        this.getTemas()
    }

    getTemas = async () => {
        try {
            const temas = await Tema.getAll()
            this.setState({ temas })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    deleteTema = async temaId => {
        try {
            const message = await Tema.delete({temaId})
            const temas = this.state.temas.filter(tema => tema.id !== temaId)
            this.setState({ message, temas })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    render() {

        const { state: {error, temas, message}, deleteTema } = this

        return <section>
                <p>Temas</p>
                {message && <p>{message}</p>}
                <TemaCard temas={temas} deleteTema={deleteTema} />
                {error && <p>{error}</p>}
        </section>
    }

}

export default AllTemas