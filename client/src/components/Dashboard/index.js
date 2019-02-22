import React, { Component } from 'react'
import { Route } from "react-router-dom"

import ManageUsers from "components/Admin/Users/ManageUsers"
import ManagePromotions from "components/Admin/Promotions/ManagePromotions"
import ManageTemas from "components/Admin/Temas/ManageTemas"
import ManageAdminExercises from "components/Admin/Exercises/ManageExercises"


import ManageStudentExercises from "components/Student/Exercises/ManageExercises"


class Dashboard extends Component {

    render() {
        return <section className="dashboard">
            <Route path="/home/admin/users" component={ManageUsers}/>
            <Route path="/home/admin/promotions" component={ManagePromotions}/>
            <Route path="/home/admin/temas" component={ManageTemas}/>
            <Route path="/home/admin/exercises" component={ManageAdminExercises}/>

            <Route path="/home/student/exercises" component={ManageStudentExercises}/>
        </section>
    }

}

export default Dashboard