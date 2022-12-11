/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import { updateProfilee, updateEmaill, updatePass } from '../redux/features/auth/authService';
import UpdateProfilePage from '../pages/UpdateProfilePage';
import { setShowPassword } from '../redux/features/auth/authSlice';

const UpdateProfile = () => {
    // const navigate = useNavigate();
    const user = useAppSelector((state: any) => state.authReducer.user);
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state: any) => state.authReducer);
    const showPassword = useAppSelector((state) => state.authReducer.showPassword);

    const updateProfile = async ({ name, email, password, passwordConfirm }: { name: string, email: string, password: string, passwordConfirm: string }) => {

        const promises = [];

        if (name !== user.name) {
            promises.push(dispatch(updateProfilee(name)));
        }

        if (email !== user.email) {
            promises.push(dispatch(updateEmaill(email)));
        }

        if (password !== '' && password === passwordConfirm) {
            promises.push(dispatch(updatePass(password)));
        }

        await Promise.all(promises);

        // if (error === null || error === undefined || error === '') {
        //     setTimeout(() => {
        //         navigate('/');
        //     }, 3000);
        // }
    }

    return (
        <UpdateProfilePage user={user} error={error} loading={false} update={updateProfile} showPassword={showPassword} setShowPassword={() => dispatch(setShowPassword(!showPassword))} />
    );
};

export default UpdateProfile;
