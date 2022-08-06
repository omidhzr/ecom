import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/Config";

// getting current user function
export default function GetCurrentUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user?.displayName);
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}
