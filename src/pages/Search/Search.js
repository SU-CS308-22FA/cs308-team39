import React from "react";
import MerchList from "../../components/MerchList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

// styles
import './Search.css'



export default function Search() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("Besiktas");
  const queryString = useLocation()
  
  const queryParams = new URLSearchParams(queryString)
  

  useEffect(() => {
    setIsPending(true);
    setQuery(queryParams.get('q'))
    console.log("query is " + query)
    const unsub = projectFirestore.collection("merchandises").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No merchandise to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            console.log(doc.data().title.includes(query))
            if(doc.data)
            results.push({ ...doc.data(), id: doc.id });
          });
          setData(results);
          setError(null);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="search">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">{isPending}</p>}
      {data && !error && <MerchList merchs={data} />}
    </div>
  )
}