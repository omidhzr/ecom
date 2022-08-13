// Work In Progress
// Does not work properly yet
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";

// export default function ProtectedRoute({children}:{children: any}) {
//   const {user, loggedIn} = UserAuth();
//   // console.log(loggedIn);

//   if (loggedIn) {
//     return <>{children}</>;
//   } else {
//     return <Navigate to="/login" />;

//   }
// }

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps {}

const ProtectedRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    //ignore line below
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log('unauthorized');
                navigate('/login');
            }
        });

        return () => AuthCheck();
    }, [auth]);

    if (loading) return <p>loading ...</p>;

    return <>{children}</>;
};

export default ProtectedRoute;

