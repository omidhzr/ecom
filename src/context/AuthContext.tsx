/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useEffect, useState } from 'react';
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
  UserCredential,
  User
} from 'firebase/auth';

// set types for context based on the functions we need to use in the app
type AuthContextType = {
  loggedIn: boolean;
  user: null | any;
  createUser: (name: string, email: string, password: string) => Promise < void > ;
  signIn: (email: string, password: string) => Promise<void> ;
  logOut: () => Promise < void > ;
  updateEmajl: (email: string) => Promise < void > ;
  updatePass: (password:string) => Promise < void > ;
  forgotPassword: (email: string) => Promise < void > ;
  updateUser: (user: string) => Promise < void > ;
  removeUser: (user: any) => Promise < void > ;
  getCurrentUser: () => Promise < void > ;
  // sendEmailVerification: () => Promise < void > ;
};

// creating context
const UserContext = createContext( {} as AuthContextType);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState < any > (null);
  const [loggedIn, setUserLoggedIn] = useState < boolean > (false);

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
    return await updateProfile(user, { displayName: name });

  };

  const signIn = async (email: string, password:string) => {
    try {
      return (await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setUserLoggedIn(true);
      }
      ));
    } catch (error: any) {
      console.log(error.message);
      
    }
  };
    

  const logOut = async () => {
    return await signOut(auth).then(() => {setUserLoggedIn(false);});
  };

  const forgotPassword = async (email:string) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const updateEmajl = async (email: string) => {
    return await updateEmail(user, email);
  };

  const updatePass = async (password:string) => {
    return await updatePassword(user, password);
  };

  const removeUser = async (user : any) => {
    return await deleteUser(user);
  };

  const getCurrentUser: any = () => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserLoggedIn(true);
      } else {
        setUser(null);
        setUserLoggedIn(false);
      }
    });
    // }, []);
    return user;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  return (
  // return the context provider with the values we want to use in the app
    <UserContext.Provider
      value={{
        loggedIn,
        createUser,
        user,
        updateUser,
        updateEmajl,
        updatePass,
        logOut,
        signIn,
        forgotPassword,
        removeUser,
        getCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
