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

      await res.user.updateProfile({ displayName: displayName });
      console.log(res.user);

      projectFirestore.collection("users").doc(res.user.uid).set({
        email: email,
        password: password,
        username: displayName,
        type: "customer",
        pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      });

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
