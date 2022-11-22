import "./Create.css";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = { title, description, price, rating, comments: []};

    try {
      await projectFirestore.collection("merchandises").add(doc);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

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
          <span>Quantity:</span>
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
  );
}
