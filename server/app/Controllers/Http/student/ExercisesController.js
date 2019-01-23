'use strict'

const Exercise = use('App/Models/Exercise')

class ExerciseCrudController {
    async add() {
        await Exercise.add(...arguments)
    }

    async get() {
        await Exercise.get(...arguments)
    }

    async update() {
        await Exercise.update(...arguments)
    }

    async remove() {
        await Exercise.remove(...arguments)
    }
}

module.exports = ExerciseCrudController
