import { useState } from "react";
import { projectAuth } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [flag, setFlag] = useState(0);

  const { dispatch } = useAuthContext();

  const signin = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // signin
      setFlag(0);
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //console.log(res.user);

      setFlag(1);
      if (!res) {
        throw new Error("Could not login");
      }

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
      return true;
    } catch (err) {
      setFlag(0);
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  return { signin, error, isPending, flag };
};
