'use strict'

const Exercise = use('App/Models/Exercise')

class ExerciseController {

    async exercises() {
        await Exercise.exercises(...arguments)
    }

    async updateStatus() {
        await Exercise.updateStatus(...arguments)
    }

    async retrieve() {
        await Exercise.get(...arguments)
    }

    async correct() {
        await Exercise.correct(...arguments)
    }

}

module.exports = ExerciseController
