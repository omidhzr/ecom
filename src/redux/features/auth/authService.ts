/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User, updateProfile, sendPasswordResetEmail, updatePassword, deleteUser, updateEmail, signOut } from 'firebase/auth';
import { auth, db } from '../../../config/config';
import { setUser } from './authSlice';
import { setDoc, collection, getDoc, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';


interface userData {
    submittedName?: string;
    submittedEmail: string;
    submittedPassword: string;
  }

interface errorInterface {
    code: string;
    message: string;
}


export const signUp = createAsyncThunk<User | null, userData, { rejectValue: errorInterface }>('user/signUp', async ({ submittedName, submittedEmail, submittedPassword }, { rejectWithValue }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, submittedEmail, submittedPassword);
    // if user is created successfully, update the profile with the name
    if (userCredential.user && submittedName) {
        await updateProfile(userCredential.user, { displayName: submittedName });
        return userCredential.user;
    }
    return null;

});

export const signIn = createAsyncThunk<User | null, userData, { rejectValue: errorInterface }>('user/signIn', async ({ submittedEmail, submittedPassword }, { rejectWithValue }) => {
    const userCredential = await signInWithEmailAndPassword(auth, submittedEmail, submittedPassword);
    // const {uid, email, displayName} = userCredential.user;
    return userCredential.user;

});

export const logOut = createAsyncThunk('user/signOut', async () => {
        await signOut(auth);
});

export const updateEmaill = createAsyncThunk<User | null, string, { rejectValue: errorInterface }>('user/updateEmail', async (email, { rejectWithValue }) => {

    const user = auth.currentUser;
    if (user) {
        await updateEmail(user, email);
        return user;
    }
    return null;

});

export const updatePass = createAsyncThunk<User | null, string, { rejectValue: errorInterface }>('user/updatePassword', async (password, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (user) {
        await updatePassword(user, password);
        return user;
    }
    return null;

});

export const updateProfilee = createAsyncThunk<User | null, string, { rejectValue: errorInterface }>('user/updateProfile', async (name, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (user) {
        await updateProfile(user, { displayName: name });
        return user;
    }
    return null;

});

export const deleteUserr = createAsyncThunk<User | null, void, { rejectValue: errorInterface }>('user/deleteUser', async (_, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (user) {
        await deleteUser(user);
        return user;
    }
    return null;
});

export const sendResetEmail = createAsyncThunk<User | null, string, { rejectValue: errorInterface }>('user/sendPasswordResetEmail', async (email, { rejectWithValue }) => {
    await sendPasswordResetEmail(auth, email);
    return null;
});

// make a thunk for sendMessage for contact page
export const sendMessage = createAsyncThunk('user/sendMessage', async (payload: any) => {
    const { submittedName, submittedEmail, submittedMessage } = payload;

    const message = {
        id: Math.random().toString(36).substring(2),
        email: submittedEmail,
        name: submittedName,
        message: submittedMessage,
    };

    const messageRef = doc(db, 'Messages', new Date().toString());

    await setDoc(messageRef, message );

    return null;
});




