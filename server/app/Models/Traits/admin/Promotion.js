'use strict'

class Promotion {
  register (Model) {

    Model.getUsers = async ({promotion, response}) => {
      
      if (!promotion) return response.status(404).send({error: 'Promotion not found'})

      const students = await promotion.users().fetch()

      return response.status(200).json({students})
    }

    Model.promotions = async ({response}) => {

      const promotions = await Model.all()

      return response.status(200).json({promotions})

    }

    Model.promotion = async ({promotion, response}) => {

      if (!promotion) return response.status(404).send({error: 'Promotion not found'})

      return response.status(200).json({promotion})

    }

    Model.editPromotion = async ({promotion, response, request}) => {

      if (!promotion) return response.status(404).send({error: 'Promotion not found'})

      const params = request.only(['name', 'season'])

      if (!Object.keys(params).length) return response.status(404).send({error: 'Promotion has not been modified'})

      promotion.merge(params)

      await promotion.save()

      return response.status(200).json({promotion, message: 'Promotion successfully modified'})

    }

    Model.addPromotion = async ({request, response}) => {

      const {name, season} = request.all()

      const promotion = await Model.create({name, season})

      return response.status(200).json({promotion, message: `Promotion ${name} successfully created`})
      
    }

    Model.deletePromotion = async ({promotion, response}) => {

      if (!promotion) return response.status(404).send({error: 'Promotion not found'})

      await promotion.delete()

      return response.status(200).json({message: 'Promotion successfully deleted'})

    }

  }
}

module.exports = Promotion
