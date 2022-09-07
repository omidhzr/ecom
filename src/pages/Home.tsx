import React, { useState, useEffect } from 'react';
import { MemoProducts } from '../components/Products';
import { auth, db } from '../config/config';
import {
  getDocs,
  setDoc,
  collection,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<never[]>([]);

  // getting current user uid
  function GetUserUid() {
    const [uid, setUid] = useState<string>('');
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid();
  // console.log('uid: '+ uid);

  // getting products function
  const getProducts = async () => {
    const products = await getDocs(collection(db, 'Products'));
    const productsArray: any = [];
    for (const snap of products.docs) {
      // console.log(snap.data().url);
      const data = snap.data();
      data.ID = snap.id;
      data.qty = 1;
      productsArray.push({
        ...data
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  // global variable
  let Product: { ID: string; qty: number; totalProductPrice: number; price: number; };

  const addToKart = async (product: any) => {
    if (uid !== null && uid !== undefined && uid !== '') {
      Product = product;
      //check if product already exists in cart
      // if yes then increase qty
      // else add to cart
      const cart = await getDocs(collection(db, 'Cart ' + uid));
      const cartArray: any = [];
      for (const snap of cart.docs) {
        const data = snap.data();
        data.ID = snap.id;
        cartArray.push({
          ...data
        });
      }
      // console.log(cartArray);
      const cartProduct = cartArray.find((cartProduct: any) => cartProduct.ID === Product.ID);
      // console.log(cartProduct);
      if (cartProduct !== undefined) {
        // console.log('product already exists in cart');
        Product.qty = cartProduct.qty + 1;
        Product.totalProductPrice = Product.qty * Product.price;
        // updating in database
        await setDoc(doc(db, 'Cart ' + uid, Product.ID), Product);
      } else {
        // console.log('product does not exist in cart');
        Product.totalProductPrice = Product.qty * Product.price;
        // updating in database
        await setDoc(doc(db, 'Cart ' + uid, Product.ID), Product);
      }
    } else {
      navigate('/login');
    }
  };


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <br></br>
      {products.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Products</h1>
          <div className="products-box">
            <MemoProducts products={products} addToCart={addToKart} />
          </div>
        </div>
      )}
      {products.length < 1 && (
        <div className="container-fluid">
          <br />
          <div className='loading'></div></div>
      )}
    </>
  );
};
