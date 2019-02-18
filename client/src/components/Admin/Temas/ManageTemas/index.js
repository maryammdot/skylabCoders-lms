import React, { Component } from 'react'
import { Link, Route } from "react-router-dom"

import isAdmin from "components/middlewares/isAdmin"
import AllTemas from "components/Admin/Temas/AllTemas"
import AddTema from "components/Admin/Temas/AddTema"
import EditTema from "components/Admin/Temas/EditTema"

class ManageTemas extends Component {

    render() {

        return <section>
            <h4>Temas</h4>
            
            <ul>
                <li><Link to="/home/admin/temas/all">Temas</Link></li>
                <li><Link to="/home/admin/temas/add">Add Tema</Link></li>
            </ul>

            <hr/>

            <Route path="/home/admin/temas/all" component={AllTemas}/>
            <Route path="/home/admin/temas/add" component={AddTema}/>
            <Route path="/home/admin/temas/edit/:temaId" component={EditTema}/>
        </section>
    }

}

export default isAdmin(ManageTemas)