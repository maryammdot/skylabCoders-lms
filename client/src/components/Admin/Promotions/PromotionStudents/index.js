import React, { Component } from 'react'
import Promotions from 'services/admin/promotions'
import StudentsCard from 'components/Admin/Promotions/PromotionStudents/StudentsCard'

class PromotionStudents extends Component {

    state = { students: [], message: null, error: null }

    promotionId = this.props.match.params.promotionId

    componentDidMount() {
        this.getPromotionStudents()
    }

    getPromotionStudents = async () => {
        const {promotionId} = this
        try {
            const students = await Promotions.getStudents({promotionId})
            this.setState({ students })
        } catch ({message}) {
            this.setState({error: message})
        }
    }

    render() {

        const { state: {error, students, message} } = this

        return <section>
                <p>All Students</p>
                {message && <p>{message}</p>}
                <StudentsCard students={students} />
                {error && <p>{error}</p>}
        </section>
    }

}

export default PromotionStudents