'use strict'

class StudentInfo {
  register (Model) {

    Model.getExercises = async ({auth, response}) => {
     
      const user = await auth.getUser()

      const exercises = await user.exercises().fetch()

      return response.status(200).json({exercises})
    }
  }
}

module.exports = StudentInfo
