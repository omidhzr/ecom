// Work In Progress
// Does not work properly yet
import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function ProtectedRoute({children}:{children: any}) {
  const {user, loggedIn} = UserAuth();
  // console.log(loggedIn);

  if (loggedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;

  }
}



