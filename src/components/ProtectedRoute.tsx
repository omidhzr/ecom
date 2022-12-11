/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface AuthRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FunctionComponent<AuthRouteProps> = ({ children }) => {

    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                // console.log('unauthorized');
                navigate('/login');
            }
        });

        return () => AuthCheck();
    }, [auth]);

    if (loading) return <p>loading ...</p>;

    return <>{children}</>;
};

export default ProtectedRoute;

