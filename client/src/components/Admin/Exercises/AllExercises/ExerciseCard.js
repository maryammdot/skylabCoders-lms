import React from 'react'
import { Link } from "react-router-dom"

export default ({ exercise }) => {
    const CardColor = `trello__exercise trello__exercise--${exercise.state}`
    return <div className={CardColor} key={exercise.id}>
            <h3>{exercise.title} - {exercise.user.username}</h3>
            <p>Tema {exercise.tema_id}</p>
            { exercise.state === 'review' && <Link to={`/home/admin/exercises/edit/${exercise.id}`}>Edit</Link>}
        </div>
}