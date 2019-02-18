import React from 'react'
import { Link } from "react-router-dom"

export default ({ exercises, deleteExercise }) => {
    return exercises.length 
    ? 
    exercises.map(exercise => (
        <div key={exercise.id}>
            <h3>{exercise.title} - <b>{exercise.state}</b></h3>
            <p>Tema {exercise.tema_id}</p>
            <div>
                <button onClick={() => deleteExercise(exercise.id)}>Delete</button>
                <Link to={`/home/student/exercises/edit/${exercise.id}`}>Edit</Link>
            </div>
        </div>
    ))
    :
    "No Exercises yet..."
}