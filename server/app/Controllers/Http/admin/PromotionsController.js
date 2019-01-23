'use strict'

const Promotion = use('App/Models/Promotion')

class PromotionController {

    async getUsers() {

        await Promotion.getUsers(...arguments)

    }

    async promotions() {
        
        await Promotion.promotions(...arguments)

    }

    async promotion() {

        await Promotion.promotion(...arguments)

    }

    async editPromotion() {

        await Promotion.editPromotion(...arguments)

    }

}

module.exports = PromotionController
