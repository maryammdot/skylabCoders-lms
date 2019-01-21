'use strict'

class ExerciseCrud {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)
  
    Model.add = async ({request, auth, response}) => {
      const user = await auth.getUser()

      const {title, theme, code } = request.all()

      const exercise = await Model.create({title, theme, code, user_id: user.id })

      return response.status(200).json({exercise, message: 'Exercise successfully added'})
    }

    Model.get = async ({exercise, response}) => {

      if (!exercise) return response.status(404).send({error: 'Exercise not found'})

      return response.status(200).json({exercise})
    }

    Model.update = async ({exercise, request, response}) => {

      if (!exercise) return response.status(404).send({error: 'Exercise not found'})

      const params = request.only(['title', 'theme', 'code', 'mark', 'status'])

      if(!Object.keys(params).length) return response.status(404).send({error: 'Exercise has not been modified'})

      exercise.merge(params)

      await exercise.save()

      return response.status(200).json({exercise, message: 'Exercise successfully modified'})
    }

    Model.remove = async ({exercise, response}) => {

      if (!exercise) return response.status(404).send({error: 'Exercise not found'})

      await exercise.delete()

      return response.status(200).json({message: 'Exercise successfully deleted'})
    }
  }
}

module.exports = ExerciseCrud
