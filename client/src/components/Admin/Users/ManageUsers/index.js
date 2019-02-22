import React, { Component } from 'react'
import { Link, Route } from "react-router-dom"

import isAdmin from "components/middlewares/isAdmin"
import AddUser from "components/Admin/Users/AddUser"
import AllUsers from "components/Admin/Users/AllUsers"

class ManageUsers extends Component {

    render() {

        return <section>
            <h4>Users</h4>
            
            <ul>
                <li><Link to="/home/admin/users/add">Add User</Link></li>
                <li><Link to="/home/admin/users/all">All Users</Link></li>
            </ul>

            <hr/>

            <Route path="/home/admin/users/add" component={AddUser}/>
            <Route path="/home/admin/users/all" component={AllUsers}/>

        </section>
    }

}

export default isAdmin(ManageUsers)