import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Menu extends Component {

    render() {
        return <section className="menu">
            <nav>
                <ul>
                    <li><Link to="/home/admin/users">Users</Link></li>
                    <li><Link to="/home/admin/promotions">Promotions</Link></li>
                </ul>
            </nav>
        </section>
    }

}

export default Menu