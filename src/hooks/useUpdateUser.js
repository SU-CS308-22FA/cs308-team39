//import React from "react";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";
import { projectFirestore, projectStorage } from "../firebase/config";
export const useUpdateUser = () => {
  const { user } = useAuthContext();
  const { updateDocument /*,response*/ } = useFirestore("users");
  const [updateError, setUpdateError] = useState(null);
  const settUpdateError = (str) => {
    setUpdateError(str);
  };
  const [updatePending, setUpdatePending] = useState(false);
  const updateUserName = async (username) => {
    setUpdateError(null);
    setUpdatePending(true);
    //try to update account username
    try {
      await user.updateProfile({ displayName: username });
      await projectFirestore.collection("users").doc(user.uid).update({
        username: username,
      });

      console.log("username update");
      setUpdateError(null);
      setUpdatePending(false);
      return true;
    } catch (err) {
      console.log("Update UserUsername Error: ", err.message);
      setUpdateError(err.message);
      setUpdatePending(false);
      return false;
    }
  };
  const updateUserPassword = async (password) => {
    setUpdateError(null);
    setUpdatePending(true);
    //try to update account password
    try {
      await user.updatePassword(password);
      await projectFirestore.collection("users").doc(user.uid).update({
        password: password,
      });

      console.log("password update");
      setUpdateError(null);
      setUpdatePending(false);
      return true;
    } catch (err) {
      console.log("Update UserPassword Error: ", err.message);
      setUpdateError(err.message);
      setUpdatePending(false);
      return false;
    }
  };
  const updateUserEmail = async (email) => {
    setUpdateError(null);
    setUpdatePending(true);
    //try to update account email
    try {
      await user.updateEmail(email);
      await projectFirestore.collection("users").doc(user.uid).update({
        email: email,
      });

      //await user.updateProfile({ email: email });
      console.log("email update");
      setUpdatePending(false);
      return true;
    } catch (err) {
      console.log("Update UserEmail Error: ", err.message);
      setUpdateError(err.message);
      setUpdatePending(false);
      return false;
    }
  };
  const updateUserPicture = async (newPic) => {
    setUpdateError(null);
    setUpdatePending(true);
    //try to update account picture
    try {
      //upload the pic
      const userRef = projectFirestore.collection("users").doc(user.uid);
      const uploadPath = `users/${userRef.id}/${newPic.name}`;
      console.log(uploadPath);
      const img = await projectStorage.ref(uploadPath).put(newPic);
      const imgUrl = await img.ref.getDownloadURL();
      await updateDocument(userRef.id, {
        pic: imgUrl,
      });
      console.log(imgUrl);
      console.log("picture update");
      setUpdateError(null);
      setUpdatePending(false);
      return true;
    } catch (err) {
      console.log("Update UserPicture Error: ", err.message);
      setUpdateError(err.message);
      setUpdatePending(false);
      return false;
    }
  };
  const updateUserType = async (type, key) => {
    setUpdateError(null);
    setUpdatePending(true);
    //try to update account type
    try {
      await projectFirestore.collection("users").doc(user.uid).update({
        key: key,
      });
      await projectFirestore.collection("users").doc(user.uid).update({
        type: type,
      });
      console.log("type update");
      setUpdateError(null);
      setUpdatePending(false);
      return true;
    } catch (err) {
      console.log("Update UserType Error: ", err.message);
      setUpdateError(err.message);
      setUpdatePending(false);
      return false;
    }
  };
  const updatePhone = async (phone) => {
    setUpdateError(null);
    setUpdatePending(true);
    //try to update account type
    try {
      await projectFirestore.collection("users").doc(user.uid).update({
        phone: phone,
      });
      console.log("Phone update");
      setUpdateError(null);
      setUpdatePending(false);
      return true;
    } catch (err) {
      console.log("Update Phone Error: ", err.message);
      setUpdateError(err.message);
      setUpdatePending(false);
      return false;
    }
  };
  return {
    updateError,
    settUpdateError,
    updatePending,
    updateUserName,
    updateUserPassword,
    updateUserEmail,
    updateUserPicture,
    updateUserType,
    updatePhone,
  };
};
