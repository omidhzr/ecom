/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../config/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  updateEmail,
  deleteUser,
  User
} from 'firebase/auth';


// set types for context based on the functions we need to use in the app
export type AuthContextType = {
  loggedIn: boolean;
  user: User | null;
  createUser: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateEmajl: (email: string) => Promise<void>;
  updatePass: (password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateUser: (user: string) => Promise<void>;
  removeUser: (user: any) => Promise<void>;
  // sendEmailVerification: () => Promise < void > ;
};

// creating context
const UserContext = createContext({
  loggedIn: false,
  user: null,
  createUser: async () => { },
  signIn: async () => { },
  logOut: async () => { },
  updateEmajl: async () => { },
  updatePass: async () => { },
  forgotPassword: async () => { },
  updateUser: async () => { },
  removeUser: async () => { },
} as unknown as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
        } else {
          // Not logged in...
          setUser(null)
        }
      }),
    [auth])

  // console.log(user);

  const createUser = async (name: string, email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
      }
    );
  };

  const updateUser = async (name: string) => {
    if (user) {
      return await updateProfile(user, { displayName: name });
    }

  };

  const signIn = async (email: string, password: string) => {
    try {
      return (await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        // setUser(user);

        setUserLoggedIn(true);
      }
      ));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };


  const logOut = async () => {
    return await signOut(auth).then(() => { setUserLoggedIn(false); });
  };

  const forgotPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const updateEmajl = async (email: string) => {
    if (user) {
      return await updateEmail(user, email);
    }
  };

  const updatePass = async (password: string) => {
    if (user) {
      return await updatePassword(user, password);
    }
  };

  const removeUser = async (user: any) => {
    return await deleteUser(user);
  };

  // console.log(user);

  const memoedValue = useMemo(
    () => ({
      loggedIn,
      createUser,
      user,
      updateUser,
      updateEmajl,
      updatePass,
      logOut,
      signIn,
      forgotPassword,
      removeUser
    }),
    [user, signIn, logOut, loggedIn]
  );

  return (
    // return the context provider with the values we want to use in the app
    <UserContext.Provider value={memoedValue}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
