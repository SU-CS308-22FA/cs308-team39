import React from "react";
import MerchList from "../../components/MerchList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import "./Recommend.css";
const { user } = useAuthContext();

export default function Recommend() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [Recommending, setRecommend] = useState(null);

  let queryString = useLocation().search;

  useEffect(() => {
    setIsPending(true);
    try {
      let queryParams = new URLSearchParams(queryString);
      const fetchData = async () => {
        const userRef = projectFirestore.collection("users").doc(user.uid);
        const doc = await userRef.get();
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.data());
        }
        setRecommend(doc.get("recommend"));
      };
      fetchData();

      const fetchMerch = async () => {
        let query = Recommending;
        const unsub = projectFirestore.collection("merchandises").onSnapshot(
          (snapshot) => {
            if (snapshot.empty) {
              setError("No recommendations available currently");
              setIsPending(false);
            } else {
              let results = [];
              snapshot.docs.forEach((doc) => {
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
      };
      fetchMerch();
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }, [queryString]);

  return (
    <div className="search">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">{isPending}</p>}
      {data && !error && <MerchList merchs={data} />}
    </div>
  );
}
