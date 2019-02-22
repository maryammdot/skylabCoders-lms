import React, { Component } from 'react'
import Exercise from 'services/admin/exercise'

import ExerciseCard from 'components/Admin/Exercises/AllExercises/ExerciseCard'
import Status from 'components/Admin/Exercises/AllExercises/Status'

class AllExercises extends Component {

    state = { exercises: [], status: null, message: null, error: null }

    componentDidMount() {
        this.getExercises()
    }

    getExercises = async () => {
        try {
            const exercises = await Exercise.getAll()
            this.setState({ exercises }, () => this.filterExercises())
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    update = async (e, status) => {

        const exerciseId = parseInt(e.dataTransfer.getData('id'))

        const exercises = this.state.exercises.filter(exercise => {
            if (exercise.id === exerciseId) {
                exercise.state = status
                exercise.time = Date.now()
            }
            return exercise
        }).sort((a, b) => a.time - b.time)

        const message = await Exercise.updateStatus({exerciseId, status})

        this.setState({ exercises, message }, this.filterExercises())
    }
    
    filterExercises() {
        let status = { pending: [], review: [], closed: [] }

        let template = exercise => (
            <div key={exercise.id} draggable onDragStart={e => e.dataTransfer.setData('id', exercise.id)}>
                 <ExerciseCard exercise={exercise} />
            </div>
        )

        this.state.exercises.forEach(exercise => status[exercise.state].push(template(exercise)))

        this.setState({status})
    }

    render() {

        const { state: {error, message, status}, update } = this

        return <section>
                {message && <p>{message}</p>}
                {status && 
                    <div className="trello">
                        <Status name='pending' exercises={status.pending} update={update}/>
                        <Status name='review' exercises={status.review} update={update}/>
                        <Status name='closed' exercises={status.closed} update={update}/>
                    </div>
                }
                {error && <p>{error}</p>}
        </section>
    }

}

export default AllExercises