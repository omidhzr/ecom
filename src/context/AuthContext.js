import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/Config";
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
} from "firebase/auth";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (name, email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
        // console.log(user.displayName);
        sendEmailVerification(user);
      }
    );
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const updateUser = async (name) => {
    return await updateProfile(auth.currentUser, { displayName: name });
    // .then(() => {
    //     console.log(auth.currentUser.displayName);
    // });
  };

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return await signOut(auth);
  };

  const forgotPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  const updateEmajl = async (email) => {
    return await updateEmail(user, email);
  };

  const updatePass = async (password) => {
    return await updatePassword(user, password);
  };

  const removeUser = async (user) => {
    return await deleteUser(user);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
