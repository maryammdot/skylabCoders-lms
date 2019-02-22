'use strict'

class Exercise {
  register (Model) {

    Model.exercises = async ({response}) => {

      const exercises = await Model.query().with('user').fetch()

      return response.status(200).json({exercises})

    }

    Model.updateStatus = async ({exercise, request, response}) => {

      const post = request.only(['status'])

      let status = 1

      switch(post.status) {
        case 'pending':
          status = 1
          break
        case 'review':
          status = 2
          break
        case 'closed':
          status = 3
          break
      }

      exercise.status = status

      await exercise.save()

      return response.status(200).json({exercise, message: 'Exercise status successfully modified'})
    }

    Model.correct = async ({exercise, request, response}) => {

      const post = request.only(['title', 'code_admin_correction'])

      if (!Object.keys(post).length) return response.status(404).send({error: 'Exercise has not been modified'})

      exercise.merge(post)

      await exercise.save()

      return response.status(200).json({exercise, message: 'Exercise successfully modified'})
    }

  }
}

module.exports = Exercise
