import React from "react";
import useContract from "./hooks/useContract";

export default function Login() {
  const { login } = useContract();
  return (
    <div className="sign-in">
      <p>Please sign in to play the game.</p>
      <button type="button" onClick={() => login()}>
        Connect wallet
      </button>
    </div>
  );
}
