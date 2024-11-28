import React, { useState } from "react";
import { SignIn, SignUp } from "../components";
function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="container mx-auto">
      {isSignIn ? (
        <SignIn setIsSignIn={setIsSignIn} />
      ) : (
        <SignUp setIsSignIn={setIsSignIn} />
      )}
    </div>
  );
}

export default Auth;
