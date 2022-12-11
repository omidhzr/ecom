/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ContactPage } from '../pages/ContactPage';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { clearError } from '../redux/features/auth/authSlice';
import { sendMessage } from '../redux/features/auth/authService';



const Contact = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.authReducer.error);

    const sendMsg = async ({ name, email, message }: { name: any, email: any, message: any }) => {

        await dispatch(sendMessage({ submittedName: name, submittedEmail: email, submittedMessage: message }));

    };


    return (
        <ContactPage error={error} clearErr={() => dispatch(clearError())} sendMsg={sendMsg} />
    )
}

export default Contact