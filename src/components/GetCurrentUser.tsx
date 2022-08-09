import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/config";

// getting current user function
export default function GetCurrentUser() {
  // set user state with type
  const [user, setUser] = useState<any>(null);
  // const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}
