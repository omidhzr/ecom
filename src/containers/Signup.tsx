/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../redux/features/auth/authService';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { SignupPage } from '../pages/SignupPage';
import { clearError } from '../redux/features/auth/authSlice';


const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.authReducer.error);

    const Register = async ({ name, email, password }: { name: any, email: any, password: any }) => {

        // dispatch signUp action
        const response = await dispatch(signUp({ submittedName: name, submittedEmail: email, submittedPassword: password }));

        // TODO: we currently get error 400 from backend in the console exposing the API key if there is an error such as user already exists, there is no way to suppress it according to:
        // https://stackoverflow.com/questions/49096911/firebase-createuserwithemailandpassword-returning-http-post-error-failure-alon
        // if there is no error, navigate to home page
        if (response.payload) {
            navigate('/');
        }

    };
    return (
        <SignupPage error={error} Register={Register} clearErr={() => dispatch(clearError())} />
    )
}

export default Signup