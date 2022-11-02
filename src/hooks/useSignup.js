import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { projectFirestore } from "../firebase/config";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [flag, setFlag] = useState(0);
  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      projectFirestore
        .collection("users")
        .add({ email: email, password: password, username: displayName });
      console.log(res.user);
      setFlag(1);
      if (!res) {
        throw new Error("Could not complete signup");
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

  return { signup, error, isPending, flag };
};
