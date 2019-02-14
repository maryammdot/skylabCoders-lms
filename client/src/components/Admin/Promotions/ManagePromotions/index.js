import React, { Component } from 'react'
import { Link, Route } from "react-router-dom"

import AllPromotions from "components/Admin/Promotions/AllPromotions"
import AddPromotion from "components/Admin/Promotions/AddPromotion"
import EditPromotion from "components/Admin/Promotions/EditPromotion"
import PromotionStudents from "components/Admin/Promotions/PromotionStudents"

class ManagePromotions extends Component {

    render() {

        return <section>
            <h4>Promotions</h4>
            
            <ul>
                <li><Link to="/home/admin/promotions/all">All Promotions</Link></li>
                <li><Link to="/home/admin/promotions/add">Add Promotion</Link></li>
            </ul>

            <hr/>

            <Route path="/home/admin/promotions/all" component={AllPromotions}/>
            <Route path="/home/admin/promotions/add" component={AddPromotion}/>
            <Route path="/home/admin/promotions/edit/:promotionId" component={EditPromotion}/>
            <Route path="/home/admin/promotions/students/:promotionId" component={PromotionStudents}/>
        </section>
    }

}

export default ManagePromotions