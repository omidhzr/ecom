/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../../../config/config';
import { setDoc, collection, getDoc, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (payload: any) => {
        const { product, email } = payload;
            // create a new object Item (copy) to store the product from payload
            const Item = {
                ID: product.ID,
                title: product.title,
                url: product.url,
                price: product.price,
                quantity: 1,
                totalPrice: product.price * 1
            };
            // console.debug(Item)

            // const Product = product;
            // console.debug(email);
            // make a document with email as the document id in the Carts collection in firestore
            // add the product in the collection connected to the document
            // the schema should look like this:
            // Carts
                //  cartId: email
                        // CartItems:  
                            //  cartItem (snapId: productID)
                            //         ID: 'dsdasd',
                            //         title: 'New Dress',
                            //         price: 10,
                            //         url: 'https://someurl/image.jpg
                            //         totalPrice: 20,
                            //         quantity: 2
                            //  cartItem
                            //         ID: 'dsdasd',
                            //         title: 'New Dress',
                            //         price: 20,
                            //         url: 'https://someurl/image.jpg
                            //         totalPrice: 100,
                            //         quantity: 5
            // check if the document exists, i.e if the user has a cart
            // if yes then add the product to the collection
            // if no then make a document with the email as the document id
            // then add the product to the collection
            const cart = await getDoc(doc(db, 'Carts', email));
            // console.debug(cart.id);
            if (cart.id === email) {
                // console.debug('cart exists');
                // add the product to the collection
                // check if the product already exists in the collection
                // if yes then increase the amount of the product
                // if no then add the product
                const cartProduct = await getDoc(doc(db, 'Carts', email, 'cartItems', Item.ID));
                // console.debug(cartProduct);
                if (cartProduct.exists()) {
                    // console.debug('product already exists in cart');
                    Item.quantity = cartProduct.data().quantity + 1;
                    Item.totalPrice = Item.quantity * Item.price;
                    // updating in database
                    await updateDoc(doc(db, 'Carts', email, 'cartItems', Item.ID), Item);
                } else {
                    // console.debug('product does not exist in cart');
                    // add it to the collection
                    await setDoc(doc(db, 'Carts', email, 'cartItems', Item.ID), Item);
                }
            } 
            return Item;
});

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (email: any) => {
        // console.debug(email);
        // get the document with the email as the document id
        // get the collection connected to the document
        // return the collection
        const cart = await getDoc(doc(db, 'Carts', email));
        // console.debug(cart.id);
        if (cart.id === email) {
            // console.debug('cart exists');
            // get the collection
            const cartItems = await getDocs(collection(db, 'Carts', email, 'cartItems'));
            const cartItemsArray: any = [];
            for (const snap of cartItems.docs) {
                const data = snap.data();
                data.ID = snap.id;
                cartItemsArray.push({
                    ...data
                });
            }
            // console.debug(cartItemsArray);
            // console.debug(cartItems);
            return cartItemsArray;
        }
    });

export const deleteFromCart = createAsyncThunk(
    'cart/deleteFromCart',
    async (payload: any) => {
        const { cartProduct, email } = payload;
        // console.debug(cartProduct);
        // console.debug(email);

        // get the document with the email as the document id
        // then get the collection connected to the document
        // delete the product from the collection and return
        const cart = await getDoc(doc(db, 'Carts', email));
        // console.debug(cart.id);
        if (cart.id === email) {
            // console.debug('cart exists');
            // delete the product from the collection
            await deleteDoc(doc(db, 'Carts', email, 'cartItems', cartProduct.ID));
            return cartProduct.ID;

        }
    }
);

export const deleteAllFromCart = createAsyncThunk(
    'cart/deleteAllFromCart',
    async (email: any) => {
        // console.debug(email);
        // get the document with the email as the document id
        // then get the collection connected to the document
        // delete the collection and return
        const cart = await getDoc(doc(db, 'Carts', email));
        // console.debug(cart.id);
        if (cart.id === email) {
            // console.debug('cart exists');
            // delete the collection
            const cartItems = await getDocs(collection(db, 'Carts', email, 'cartItems'));
            for (const snap of cartItems.docs) {
                await deleteDoc(doc(db, 'Carts', email, 'cartItems', snap.id));
            }
            return email;
        }
    }
);


export const increaseQuantity = createAsyncThunk(
    'cart/increaseQuantity',
    async (payload: any) => {
        const { cartProduct, email } = payload;
        // console.debug(cartProduct);
        // console.debug(email);

        // get the document with the email as the document id
        // get the collection connected to the document
        // increase the quantity of the product in the collection
        const cart = await getDoc(doc(db, 'Carts', email));
        // console.debug(cart.id);
        if (cart.id === email) {
            // console.debug('cart exists');

            const cartItem = await getDoc(doc(db, 'Carts', email, 'cartItems', cartProduct.ID));
            //  check if the product exists in the cart
            if (cartItem.exists()) {
                // console.debug('product already exists in cart');
                // increase the quantity of the product in the collection
                const Item = {
                    ...cartProduct,
                    quantity: cartItem.data().quantity + 1,
                    totalPrice: (cartItem.data().quantity + 1) * cartProduct.price
                };

                // updating in database
                await updateDoc(doc(db, 'Carts', email, 'cartItems', cartProduct.ID), Item);
                return Item;
            }
        }

    }
);

export const decreaseQuantity = createAsyncThunk(
    'cart/decreaseQuantity',
    async (payload: any) => {
        const { cartProduct, email } = payload;
        // console.debug(cartProduct);
        // console.debug(email);

        // get the document with the email as the document id
        // get the collection connected to the document
        // decrease the quantity of the product in the collection
        const cart = await getDoc(doc(db, 'Carts', email));
        // console.debug(cart.id);
        if (cart.id === email) {
            // console.debug('cart exists');
            // decrease the quantity of the product in the collection
            // check if the quantity is 1
            // if yes then delete the product from the collection
            // if no then decrease the quantity by 1
            const cartItem = await getDoc(doc(db, 'Carts', email, 'cartItems', cartProduct.ID));
            //  check if the product exists in the cart
            if (cartItem.exists()) {
                // console.debug('product already exists in cart');
                // decrease the quantity of the product in the collection
                const Item = {
                    ...cartProduct,
                    quantity: cartItem.data().quantity - 1,
                    totalPrice: (cartItem.data().quantity - 1) * cartProduct.price
                };
                // check if the quantity is 0 or less
                // if yes then delete the product from the collection
                if (Item.quantity <= 0) {
                    // delete the product from the collection
                    await deleteDoc(doc(db, 'Carts', email, 'cartItems', cartProduct.ID));
                    return Item;
                } else {
                    // update the doc in database
                    await updateDoc(doc(db, 'Carts', email, 'cartItems', cartProduct.ID), Item);
                    return Item;
                }
            }
        }

    }
);

