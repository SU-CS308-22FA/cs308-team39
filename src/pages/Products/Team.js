import React from "react";
import MerchList from "../../components/MerchList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import styles from "./Team.module.css";

export default function Team() {
  let { team } = useParams()
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  team = team[0].toUpperCase() + team.substring(1)

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("merchandises").where("team", "==", team).onSnapshot(
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
  }, [team]);

  return (
    <div className={styles["home"]}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">{isPending}</p>}
      {data && !error && <MerchList merchs={data} />}
    </div>
  );
}
