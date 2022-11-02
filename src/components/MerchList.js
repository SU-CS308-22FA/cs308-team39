import './MerchList.css'
import React from "react";
import { Link } from 'react-router-dom'

export default function MerchList({ merchs }) {
    return (
        <div className="merch-list">
            {merchs.map(merch => (
                <div key={merch.id} className="card">
                    <h3>{merch.title}</h3>
                    <div>{merch.description.substring(0,50)}...</div>
                    <p>{merch.rating} out of 5</p>
                    <p>{merch.price} TL</p>
                    <Link to={`/merch/${merch.id}`}>More</Link>
                </div>        
            ))}
        </div>
    )
}