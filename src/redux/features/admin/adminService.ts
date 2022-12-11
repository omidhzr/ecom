/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth, db, storage } from '../../../config/config';
import { addDoc, setDoc, collection, getDoc, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updateProfile, User } from 'firebase/auth';
// import ProgressBar from 'react-bootstrap/ProgressBar';
import {setError, setProgress} from './adminSlice'


export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        const users = await getDocs(collection(db, 'Users'));
        const usersArray: any = [];
        for (const snap of users.docs) {
            const data = snap.data();
            data.ID = snap.id;
            usersArray.push({
                ...data
            });
        }
        return usersArray;
    }
);

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

// create a createAsyncThunk for uploading a file from admin page to firebase storage and firestore
export const addProduct = createAsyncThunk('user/uploadFile', async ({image, title, description, price}:{image: File| null, title: string, description: string, price: number}) => {


    // console.debug(image);

    const storageRef = ref(storage, `product-images/${image?.name}`);

    // upload the file to firebase storage
    const uploadTask = uploadBytesResumable(storageRef, image!);
    // listen to the upload progress
    uploadTask.on(
        'state_changed',
        (snapshot: { bytesTransferred: number; totalBytes: number; }) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
          // console.debug(prog);
        },
        (error: { message: any; }) => setError(error.message),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
            addDoc(collection(db, 'Products'), {
              title,
              description,
              price: price,
              url
            })
              .catch((error: any) => setError(error.message));
          });
        }
      );
    
});


export const editProduct = createAsyncThunk('user/editFile', async ({title, description, price, id}:{title: string, description: string, price: number, id: string}) => {
    // edit the product in firestore
    const docRef = doc(db, 'Products', id);
    await updateDoc(docRef, {
        title,
        description,
        price
    });

    return null;

});

// deleteProduct
export const deleteProduct = createAsyncThunk('user/deleteFile', async ({id, url}:{id: string, url: string}) => {
    // delete the product in firestore
    const docRef = doc(db, 'Products', id);
    try {
        await deleteDoc(docRef);
    }
    catch (error: any) {
        setError(error.message);
    }


    // delete the product in storage
    const storageRef = ref(storage, url);
    try {
    await deleteObject(storageRef);
    }
    catch (error: any) {
        setError(error.message);
    }

    return null;
});


export const fetchAllOrders = createAsyncThunk(
    'order/fetchAllOrders',
    async () => {
        // get all the documents in the Orders collection
        // get the collection connected to the document
        // return the collection
        const orders = await getDocs(collection(db, 'Orders'));
        // console.debug(orders);
        // for every document in the collection get the orderItems collection and then cartItemsList
        const ordersArray: any = [];
        for (const snap of orders.docs) {
            
            const orderItems = await getDocs(collection(db, 'Orders', snap.id, 'orderItems'));
            // add snap.id to the orderItemsArray
            const orderItemsArray: any = [];
            for (const orderItem of orderItems.docs) {
                const data = orderItem.data();
                data.ID = orderItem.id;
                orderItemsArray.push({
                    ...data
                });
            }
            const data = snap.data();
            data.ID = snap.id;
            ordersArray.push({
                ...data,
                orderItems: orderItemsArray
            });

        }
        return ordersArray;
    }
);

    //         for (const snap of orderItems.docs) {
    //             const data = snap.data();
    //             data.ID = snap.id;
    //             ordersArray.push({
    //                 ...data
    //             });
                
    //         }
    //     }
    //     console.debug(ordersArray);
    //     return ordersArray;
       

    // });




 

