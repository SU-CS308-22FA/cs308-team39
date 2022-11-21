import React from "react";
import ShirtList from "../../components/ShirtList";
import { useEffect, useState } from "react";

import { projectFirestore } from "../../firebase/config";
import styles from "./Shirts.module.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("shirts").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No merchandise to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            // console.log(doc)
            results.push({ ...doc.data(), id: doc.id });
          });
          setData(results);
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
      {error && <p classname="error">{error}</p>}
      {isPending && <p classname="loading">{isPending}</p>}
      {data && !error && <ShirtList shirts={data} />}
    </div>
  );
}
