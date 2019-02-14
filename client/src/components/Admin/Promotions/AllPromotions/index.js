import React, { Component } from 'react'
import Promotions from 'services/admin/promotions'
import PromotionCard from 'components/Admin/Promotions/AllPromotions/PromotionCard'

class AllPromotions extends Component {

    state = { promotions: [], message: null, error: null }

    componentDidMount() {
        this.getPromotions()
    }

    getPromotions = async () => {
        try {
            const promotions = await Promotions.getAll()
            this.setState({ promotions })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    deletePromotion = async promotionId => {
        try {
            const message = await Promotions.delete({promotionId})
            const promotions = this.state.promotions.filter(propmotion => propmotion.id !== promotionId)
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