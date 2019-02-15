'use strict'

class Tema {
  register (Model) {

    Model.addTema = async ({request, response}) => {

      const {name, number} = request.all()

      const tema = await Model.create({name, number})

      return response.status(200).json({tema, message: `Tema ${name} successfully created`})
      
    }

    Model.tema = async ({tema, response}) => {

      if (!tema) return response.status(404).send({error: 'Tema not found'})

      return response.status(200).json({tema})

    }

    Model.temas = async ({response}) => {

      const temas = await Model.all()

      return response.status(200).json({temas})

    }

    Model.editTema = async ({tema, response, request}) => {

      if (!tema) return response.status(404).send({error: 'Tema not found'})

      const params = request.only(['name', 'number'])

      if (!Object.keys(params).length) return response.status(404).send({error: 'Tema has not been modified'})

      tema.merge(params)

      await tema.save()

      return response.status(200).json({tema, message: 'Tema successfully modified'})

    }

    Model.deleteTema = async ({tema, response}) => {

      if (!tema) return response.status(404).send({error: 'Tema not found'})

      await tema.delete()

      return response.status(200).json({message: 'Tema successfully deleted'})

    }

  }
}

module.exports = Tema
