import React, { Component } from 'react'
import { Link, Route } from "react-router-dom"

import isAdmin from "components/middlewares/isAdmin"
import AllExercises from "components/Admin/Exercises/AllExercises"
import EditExercise from "components/Admin/Exercises/EditExercise"

class ManageExercises extends Component {

    render() {

        return <section>
            <h4>Exercises</h4>
            
            <ul>
                <li><Link to="/home/admin/exercises/all">All Users</Link></li>
            </ul>

            <hr/>

            <Route path="/home/admin/exercises/all" component={AllExercises}/>
            <Route path="/home/admin/exercises/edit/:exerciseId" component={EditExercise}/>

        </section>
    }

}

export default isAdmin(ManageExercises)