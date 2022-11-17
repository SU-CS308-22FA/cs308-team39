import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { projectFirestore } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [flag, setFlag] = useState(0);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      setFlag(0);
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      projectFirestore.collection("users").add({
        email: email,
        password: password,
        username: displayName,
      });
      await res.user.updateProfile({ displayName: displayName });
      console.log(res.user);

      setFlag(1);
      if (!res) {
        throw new Error("Could not complete signup");
      }
      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });
      setIsPending(false);
      setError(null);
    } catch (err) {
      setFlag(0);
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signup, error, isPending, flag };
};
