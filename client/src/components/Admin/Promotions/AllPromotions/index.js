import React, { Component } from 'react'
import Promotion from 'services/admin/promotion'
import PromotionCard from 'components/Admin/Promotions/AllPromotions/PromotionCard'

class AllPromotions extends Component {

    state = { promotions: [], message: null, error: null }

    componentDidMount() {
        this.getPromotions()
    }

    getPromotions = async () => {
        try {
            const promotions = await Promotion.getAll()
            this.setState({ promotions })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    deletePromotion = async promotionId => {
        try {
            const message = await Promotion.delete({promotionId})
            const promotions = this.state.promotions.filter(promotion => promotion.id !== promotionId)
            this.setState({ message, promotions })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    render() {

        const { state: {error, promotions, message}, deletePromotion } = this

        return <section>
                <p>All Promotions</p>
                {message && <p>{message}</p>}
                <PromotionCard promotions={promotions} deletePromotion={deletePromotion} />
                {error && <p>{error}</p>}
        </section>
    }

}

export default AllPromotions