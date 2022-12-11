/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import { sendResetEmail } from '../redux/features/auth/authService'
import { clearError } from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/store'

const ForgotPassword = () => {
    // const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.authReducer.error);

    const resetPassword = async (email: string) => {
        // e.preventDefault();
        // setError('');
        try {
            dispatch(sendResetEmail(email));
            // await forgotPassword(email);
            // setMessage('An email has been sent! Please check your email (and spams) to reset the password!');
            setTimeout(
                function () {
                    navigate('../Login');
                }
                , 10000);
        } catch (error: any) {
            console.debug(error);
        }
    };
    return (
        <ForgotPasswordPage error={error} clearErr={() => dispatch(clearError())} resetPassword={resetPassword} />
    )
}

export default ForgotPassword