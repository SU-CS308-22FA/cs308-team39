import './Create.css'
import React from "react";
import { useState } from 'react'


export default function Create() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = (e) => {
        //e.preventDefault()
        console.log(title, description, price, rating)
      }
    
      return (
        <div className="create">
          <h2 className="page-title">Add a New Merchandise</h2>
          <form onSubmit={handleSubmit}>
    
            <label>
              <span>Merchandise title:</span>
              <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </label>
    
            <label>
              <span>Merchandise Description:</span>
              <textarea 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </label>
    
            <label>
              <span>Price (TL):</span>
              <input 
                type="number" 
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required 
              />
            </label>

            <label>
              <span>Rating (out of 5):</span>
              <input 
                type="number" 
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                required 
              />
            </label>
    
            <button className="btn">submit</button>
          </form>
        </div>
      )
}
