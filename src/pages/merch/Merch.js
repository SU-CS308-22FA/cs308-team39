import React from "react";
import './Merch.css'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

export default function Merch() {
    const { id } = useParams()
    const url = 'http://localhost:3000/merchs/' + id
    const { error, isPending, data: merch } = useFetch(url)

    return (
        <div className="merch">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {merch && (
                <>
                   <h2 className="page-title">{merch.title}</h2> 
                   <p>{merch.description}</p>
                    <p>{merch.rating} out of 5</p>
                    <p>{merch.price} TL</p>
                </>
            )}
        </div>
    )
}