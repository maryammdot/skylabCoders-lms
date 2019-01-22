'use strict'

class Promotion {
  register (Model) {

    Model.getUsers = async ({promotion, response}) => {
      
      if (!promotion) return response.status(404).send({error: 'promotion not found'})

      const users = await promotion.users().fetch()

      return response.status(200).json({users})
    }

  }
}

module.exports = Promotion
