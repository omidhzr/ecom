/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { LoginPage } from '../pages/LoginPage';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../redux/features/auth/authService';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { clearError, setShowPassword } from '../redux/features/auth/authSlice';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.authReducer.error);
    const showPassword = useAppSelector((state) => state.authReducer.showPassword);


    const loginToApp = async ({ email, password }: { email: any, password: any }) => {

        // dispatch signIn
        const response = await dispatch(signIn({ submittedEmail: email, submittedPassword: password }));
        // if there is no error, navigate to home page
        if (response.payload) {
            navigate('/');
        }
    };


    return (
        <LoginPage showPassword={showPassword} setShowPassword={() => dispatch(setShowPassword(!showPassword))} loginToApp={loginToApp} error={error} clearErr={() => dispatch(clearError())} />

    )
}

export default Login