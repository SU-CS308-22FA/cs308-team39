import "./Create.css";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { projectFirestore, projectStorage } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

// for now categories stored here
const categories = [
  { value: "jacket", label: "Jacket" },
  { value: "shirt", label: "Shirt" },
  { value: "shorts", label: "Shorts" },
  { value: "pants", label: "Pants" },
  { value: "shoes", label: "Shoes" },
  { value: "socks", label: "Socks" },
  { value: "hat", label: "Hat" },
  { value: "glasses", label: "Glasses" },
  { value: "bag", label: "Bag" },
  { value: "flag", label: "Flag" },
  { value: "keychain", label: "Keychain" },
  { value: "football", label: "Football" },
];

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("other");
  const [imageError, setImageError] = useState(null);
  const { updateDocument /*,response*/ } = useFirestore("merchandises");
  const history = useHistory();
  const { user } = useAuthContext();

  const handleFileChange = (e) => {
    console.log(user.uid);
    setImage(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setImageError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setImageError("Selected file must be an image");
      return;
    }
    if (selected.size > 500000) {
      setImageError("Image file size must be less than 500kb");
      return;
    }

    setImageError(null);
    setImage(selected);
    console.log("image updated");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const t_user = projectFirestore.collection("users").doc(user.uid).get();
      const a = (await t_user).data().type;
      const doc = {
        title,
        description,
        price,
        rating,
        category,
        comments: [],
        team: a,
      };
      console.log(doc);
      // add the merch without the image url
      const res = await projectFirestore.collection("merchandises").add(doc);
      console.log(`new document id: ${res.id}`);
      if (image !== null) {
        //upload the image
        const uploadPath = `images/${res.id}/${image.name}`;
        console.log(uploadPath);

        const img = await projectStorage.ref(uploadPath).put(image);
        const imgUrl = await img.ref.getDownloadURL();

        //update the merch to have the uploaded image url
        await updateDocument(res.id, {
          imageURL: imgUrl,
          team: a,
        });
      } else {
        const defaultImageUrl = `https://firebasestorage.googleapis.com/v0/b/cs308group39.appspot.com/o/images%2Fdefault%2Ftff.png?alt=media&token=ca57d197-d6e2-445b-b528-fc9aa2d34698`;
        await updateDocument(res.id, {
          imageURL: defaultImageUrl,
          team: a,
        });
      }

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
          <input type="file" onChange={handleFileChange} />
          {imageError && <div className="error">{imageError}</div>}
        </label>
        <label>
          <span>Merchandise Category:</span>
          <Select
            required
            options={categories}
            onChange={(option) => setCategory(option.value)}
          />
        </label>

        <button className="btn">submit</button>
        {!user && (
          <p className="error">
            Can not add merchandise if you are not logged in
          </p>
        )}
      </form>
    </div>
  );
}
