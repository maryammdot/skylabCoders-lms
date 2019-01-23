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

      if(!Object.keys(params).length) return response.status(404).send({error: 'Promotion has not been modified'})

      promotion.merge(params)

      await promotionsave()

      return response.status(200).json({promotion, message: 'Promotion successfully modified'})

    }

  }
}

module.exports = Promotion
