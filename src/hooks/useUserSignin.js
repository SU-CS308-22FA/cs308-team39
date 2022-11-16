import { useState } from "react";
import { projectAuth } from "../firebase/config";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [flag, setFlag] = useState(0);
  const signin = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // signin
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      const idToken = projectAuth.currentUser.getIdToken.toString;
      console.log(idToken);

      setFlag(1);
      if (!res) {
        throw new Error("Could not login");
      }
      setIsPending(false);
      setError(null);
    } catch (err) {
      setFlag(0);
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signin, error, isPending, flag };
};
