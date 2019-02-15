'use strict'

class Exercise {
  register (Model) {
  
    Model.add = async ({request, auth, response}) => {
      
      const user = await auth.getUser()

      const {title, code, tema_id} = request.all()

      const exercise = await Model.create({title, code, tema_id, user_id: user.id })

      return response.status(200).json({exercise, message: 'Exercise successfully sent'})
    }

    Model.get = async ({exercise, response}) => {

      if (!exercise) return response.status(404).send({error: 'exercise not found'})

      return response.status(200).json({exercise})
    }

    Model.update = async ({exercise, request, response}) => {

      const params = request.only(['title', 'code', 'tema_id'])

      if (!Object.keys(params).length) return response.status(404).send({error: 'Exercise has not been modified'})

      exercise.merge(params)

      await exercise.save()

      return response.status(200).json({exercise, message: 'Exercise successfully modified'})
    }

    Model.remove = async ({exercise, response}) => {

      if (!exercise) return response.status(404).send({error: 'exercise not found'})

      await exercise.delete()

      return response.status(200).json({message: 'Exercise successfully deleted'})
    }
  }
}

module.exports = Exercise
