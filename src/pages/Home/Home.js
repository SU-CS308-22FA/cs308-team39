
import React from "react";
import MerchList from "../../components/MerchList";
import { useEffect, useState } from 'react'


import { projectFirestore } from '../../firebase/config'
import styles from "./Home.module.css";

export default function Home() {
  
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsPending(true)

    projectFirestore.collection('merchandises').get().then(snapshot => {
      if (snapshot.empty) {
        setError('No merchandise to load')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          // console.log(doc)
          results.push({ ...doc.data(), id: doc.id })
        })
        setData(results)
        setIsPending(false)
      }
    }).catch(err => {
      setError(err.message)
      setIsPending(false)
    })

  }, [])

  return (
  <div className={styles["home"]}>
    {error && <p classname="error">{error}</p>}
    {isPending && <p classname="loading">{isPending}</p>}
    {data && <MerchList merchs={data}/>}
  </div>
  )
}
