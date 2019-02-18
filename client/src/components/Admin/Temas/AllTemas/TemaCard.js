import React from 'react'
import { Link } from "react-router-dom"

export default ({ temas, deleteTema }) => {
    return temas.length 
    ? 
    temas.map(tema => (
        <div key={tema.id}>
            <h3>{tema.name}</h3>
            <p>{tema.number}</p>
            <div>
                <button onClick={() => deleteTema(tema.id)}>Delete</button>
                <Link to={`/home/admin/temas/edit/${tema.id}`}>Edit</Link>
            </div>
        </div>
    ))
    :
    "No Temas yet..."
}