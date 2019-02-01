'use strict'

class Promotion {
  register (Model) {

    Model.getUsers = async ({promotion, response}) => {
      
      if (!promotion) return response.status(404).send({error: 'promotion not found'})

      const users = await promotion.users().fetch()

      return response.status(200).json({users})
    }

    Model.promotions = async ({response}) => {

      const promotions = await Model.all()

      return response.status(200).json({promotions})

    }

    Model.promotion = async ({promotion, response}) => {

      if (!promotion) return response.status(404).send({error: 'promotion not found'})

      return response.status(200).json({promotion})

    }


    Model.editPromotion = async ({promotion, response, request}) => {

      if (!promotion) return response.status(404).send({error: 'promotion not found'})

      const params = request.only(['name', 'year'])

      if (!Object.keys(params).length) return response.status(404).send({error: 'Promotion has not been modified'})

      promotion.merge(params)

      await promotion.save()

      return response.status(200).json({promotion, message: 'Promotion successfully modified'})

    }

    Model.addPromotion = async ({request, response}) => {

      const {name, year} = request.all()

      const promotion = await Model.create({name, year})

      return response.status(200).json({promotion, message: `Promotion ${name} successfully created`})
      
    }

    Model.deletePromotion = async ({promotion, response}) => {

      if (!promotion) return response.status(404).send({error: 'promotion not found'})

      await promotion.delete()

      return response.status(200).json({message: 'Promotion successfully deleted'})

    }

  }
}

module.exports = Promotion
