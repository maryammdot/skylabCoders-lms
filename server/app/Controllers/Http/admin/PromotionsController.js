'use strict'

const Promotion = use('App/Models/Promotion')

class PromotionController {

    async getUsers() {

        await Promotion.getUsers(...arguments)

    }

}

module.exports = PromotionController
