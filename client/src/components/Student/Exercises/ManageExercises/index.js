import React, { Component } from 'react'
import { Link, Route } from "react-router-dom"

import AddExercise from "components/Student/Exercises/AddExercise"
import AllExercises from "components/Student/Exercises/AllExercises"

class ManageExercises extends Component {

    render() {

        return <section>
            <h4>Exercises</h4>
            
            <ul>
                <li><Link to="/home/student/exercises/all">All Exercises</Link></li>
                <li><Link to="/home/student/exercises/add">Add Exercise</Link></li>
            </ul>

            <hr/>

            <Route path="/home/student/exercises/all" component={AllExercises}/>
            <Route path="/home/student/exercises/add" component={AddExercise}/>

        </section>
    }

}

export default ManageExercises