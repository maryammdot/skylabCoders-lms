import React, { Component } from 'react'
import { Link } from "react-router-dom"
import store from "plugins/store"


class Menu extends Component {

    renderLinks() {
        return store.isAdmin() ? this.adminLinks() : this.studentLinks()
        
    }

    adminLinks() {
        return (
            <ul>
                <li><Link to="/home/admin/users">Users</Link></li>
                <li><Link to="/home/admin/promotions">Promotions</Link></li>
            </ul>
        )
    }

    studentLinks() {
        return (
            <ul>
                <li><Link to="/home/student/exercises">Exercises</Link></li>
            </ul>
        )
    }

    render() {
        return <section className="menu">
            <nav>{this.renderLinks()}</nav>
        </section>
    }

}

export default Menu