import React from "react";
import MerchList from "../../components/MerchList";
import { useEffect, useState } from "react";

import { projectFirestore } from "../../firebase/config";
import styles from "./Recommend.css";

export default function Recommend() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("merchandises").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No merchandise to load");
          setIsPending(false);
        } else {
          let results = [];
          let query = "jacket";
          snapshot.docs.forEach((doc) => {
            // console.log(doc)
            if (
              doc
                .data()
                .category.toLowerCase()
                .trim()
                .includes(query.toLowerCase().trim())
            )
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
    <div className={styles["home"]}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">{isPending}</p>}
      {data && !error && <MerchList merchs={data} />}
    </div>
  );
}
