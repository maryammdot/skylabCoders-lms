import React from 'react'
import { Link } from "react-router-dom"

export default ({ promotions, deletePromotion }) => {
    return promotions.length 
    ? 
    promotions.map(promotion => (
        <div key={promotion.id}>
            <h3>{promotion.name}</h3>
            <p>{promotion.season}</p>
            <div>
                <button onClick={() => deletePromotion(promotion.id)}>Delete</button>
                <Link to={`/home/admin/promotions/edit/${promotion.id}`}>Edit</Link>
                <Link to={`/home/admin/promotions/students/${promotion.id}`}>Students</Link>
            </div>
        </div>
    ))
    :
    "No promotions yet..."
}