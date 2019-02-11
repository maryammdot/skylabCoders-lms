import React, { Component } from 'react'
import { Route } from "react-router-dom"

import ManageUsers from "components/Admin/ManageUsers"
import ManagePromotions from "components/Admin/Promotions/ManagePromotions"

class Dashboard extends Component {

    render() {
        return <section className="dashboard">
            <Route path="/home/admin/users" component={ManageUsers}/>
            <Route path="/home/admin/promotions" component={ManagePromotions}/>
        </section>
    }

}

export default Dashboard