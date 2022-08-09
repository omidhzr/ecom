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
  deleteUser
} from 'firebase/auth';

// creating context
const UserContext = createContext({
  // set default values with respective types for context based on the functions we need to use in the app
  user: null,
  createUser: (n:string, e:string, p:string) => {},
  updateUser: (user: string) => {},
  signIn: (e:string, p:string) => {},
  logOut: () => {},
  forgotPassword: (e: string) => {},
  // sendEmailVerification: () => {},
  updatePass: (s:string) => {},
  updateEmajl: (e: string) => {},
  removeUser: (u: any) => {},
  getCurrentUser: () => {}
});

export const AuthContextProvider = ({ children }: any) => {
  // define setUser hook with type any
  const [user, setUser] = useState<null |any>(null);

  const createUser = async (name: string, email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
        // console.log(user.displayName);
        // sendEmailVerification(user);
      }
    );
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const updateUser = async (name: string) => {
    return await updateProfile(user, { displayName: name });

    // return await updateProfile(auth.currentUser, { displayName: name });
    // .then(() => {
    //     console.log(auth.currentUser.displayName);
    // });
  };

  const signIn = async (email: string, password:string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return await signOut(auth);
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
    // define setUser hook with type of user
    // const [user, setUser] = useState<any>(null);
    // const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUser(user);
        return user;
      } else {
        setUser(null);
      }
    });
    // }, []);
    // return user;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //   console.log(currentUser);
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
