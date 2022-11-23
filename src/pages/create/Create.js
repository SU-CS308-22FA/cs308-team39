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
  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState(null)
  const history = useHistory();

  const handleFileChange = (e) => {
    setImage(null)
    let selected = e.target.files[0]
    console.log(selected)

    if (!selected) {
      setImageError('Please select a file')
      return
    }
    if (!selected.type.includes('image')){
      setImageError('Selected file must be an image')
      return
    }
    if (selected.size > 500000) {
      setImageError('Image file size must be less than 500kb')
      return
    }

    setImageError(null)
    setImage(selected)
    console.log('image updated')
  }

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
        <label>
          <span>Add an image of your merchandise:</span>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
          {imageError && <div className="error">{imageError}</div>}
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
}
