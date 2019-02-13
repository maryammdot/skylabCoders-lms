import React from 'react'
import { Link } from "react-router-dom"

export default ({ promotions, deletePromotion }) => {
    return promotions 
    ? 
    promotions.map(promotion => (
        <div key={promotion.id}>
            <h3>{promotion.name}</h3>
            <p>{promotion.season}</p>
            <div>
                <button onClick={() => deletePromotion(promotion.id)}>Delete</button>
                <Link to={`/home/admin/promotions/edit/${promotion.id}`}>Edit</Link>
            </div>
        </div>
    ))
    :
    "loading..."
}