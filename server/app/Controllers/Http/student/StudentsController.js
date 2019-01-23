'use strict'

const User = use('App/Models/User')

class StudentInfoController {
    async getExercises() {
        await User.getExercises(...arguments)
    }
}

module.exports = StudentInfoController
