import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function UserPage() {
  const { user } = useAuthContext();

  console.log("AAAAAAAAAAA");

  const handleClick = () => {};

  return (
    <>
      {user && (
        <>
          <h2>'hiiiiii {user.displayName}'</h2>
          <button onClick={handleClick}>Click</button>
        </>
      )}
      <h1>HELLO</h1>
    </>
  );
}
