import React, { Component } from 'react'
import Exercise from 'services/student/exercise'
import ExerciseCard from 'components/Student/Exercises/AllExercises/ExerciseCard'

class AllExercises extends Component {

    state = { exercises: [], message: null, error: null }

    componentDidMount() {
        this.getExercises()
    }

    getExercises = async () => {
        try {
            const exercises = await Exercise.getAll()
            this.setState({ exercises })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    deleteExercise = async exerciseId => {
        try {
            const message = await Exercise.delete({exerciseId})
            const exercises = this.state.exercises.filter(exercise => exercise.id !== exerciseId)
            this.setState({ message, exercises })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    render() {

        const { state: {error, exercises, message}, deleteExercise } = this

        return <section>
                <p>My Exercises</p>
                {message && <p>{message}</p>}
                <ExerciseCard exercises={exercises} deleteExercise={deleteExercise} />
                {error && <p>{error}</p>}
        </section>
    }

}

export default AllExercises