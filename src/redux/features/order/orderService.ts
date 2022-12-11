/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../../../config/config';
import { setDoc, collection, getDoc, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (payload: any) => {
        const { order, userEmail } = payload;
        // console.debug(order);
        // make a copy of the order object and take only the cartItemsList from the order
        // const orderItems = order.cartItemsList;
        // console.debug(orderItems);

        // create a document with the email as the document id
        // create a collection connected to the document
        // add the order to the collection
        // the schema should look like this:
        // Orders
            // userEmail
                // orderId (order.id)
                    // orderItems (cartItemsList)
                        // orderItem
                            // ID: 'dsdasd',
                            // title: 'New Dress',
                            // price: 10,
                            // url: 'https://someurl/image.jpg
                            // totalPrice: 20,
                            // quantity: 2
                        // orderItem
                            // ID: 'dsdasd',
                            // title: 'New Dress',
                            // price: 20,
                            // url: 'https://someurl/image.jpg
                            // totalPrice: 100,
                            // quantity: 5

        // check if the document exists, i.e if the user has an order
        // if yes then add the order to the collection
        // if no then make a document with the email as the document id
        // then add the order to the collection
        const userOrder = await getDoc(doc(db, 'Orders', userEmail));
        // console.debug(userOrder.id);
        if (userOrder.exists()) {
            // console.debug('user has an order');
            // add the order to the collection
            await setDoc(doc(db, 'Orders', userEmail, 'orderItems', order.id), order);

        } else {
            // console.debug('user has no order');
            // make a document with the email as the document id
            // then add the order to the collection
            await setDoc(doc(db, 'Orders', userEmail), {
                userEmail: userEmail,
                name: order.name,
                address: order.address,
                city: order.city,
                country: order.country,
                zip: order.zip,

            });
            await setDoc(doc(db, 'Orders', userEmail, 'orderItems', order.id), order);

        }

        return order;
    }
);


export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async (email: any) => {
        // console.debug(email);
        // get the document with the email as the document id
        // get the collection connected to the document
        // return the collection
        const order = await getDoc(doc(db, 'Orders', email));
        // console.debug(order.id);
        if (order.id === email) {
            // console.debug('order exists');
            // get the collection
            const orders = await getDocs(collection(db, 'Orders', email, 'order'));
            const ordersArray: any = [];
            for (const snap of orders.docs) {
                const data = snap.data();
                data.ID = snap.id;
                ordersArray.push({
                    ...data
                });
            }
            // console.debug(ordersArray);
            // console.debug(orders);
            return ordersArray;
        }
    }
);

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async (payload: any) => {
        const { order, email } = payload;
        // console.debug(order);
        // console.debug(email);
        // get the document with the email as the document id
        // get the collection connected to the document
        // update the order in the collection and return
        const orderDoc = await getDoc(doc(db, 'Orders', email));
        // console.debug(orderDoc.id);
        if (orderDoc.id === email) {
            // console.debug('order exists');
            // update the order in the collection
            await updateDoc(doc(db, 'Orders', email, 'order', order.ID), order);
            return order;
        }
    }
);

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (payload: any) => {
        const { order, email } = payload;
        // console.debug(order);
        // console.debug(email);
        // get the document with the email as the document id
        // get the collection connected to the document
        // delete the order from the collection and return
        const orderDoc = await getDoc(doc(db, 'Orders', email));
        // console.debug(orderDoc.id);
        if (orderDoc.id === email) {
            // console.debug('order exists');
            // delete the order from the collection
            await deleteDoc(doc(db, 'Orders', email, 'order', order.ID));
            return order.ID;
        }
    }
);






