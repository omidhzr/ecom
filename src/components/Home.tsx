import React, { useState, useEffect, useContext } from 'react';
import { Navbar } from './Navbar';
import { MemoProducts, Products } from './Products';
import { auth, db } from '../config/config';
import {
  onSnapshot,
  getDocs,
  setDoc,
  collection,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { DarkModeContext } from '../context/DarkModeContext';

export const Home = () => {
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [products, setProducts] = useState<never[]>([]);
  const { user } = UserAuth();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  if (darkMode) {
    // make the root dark
    document.body.className = "dark";
  } else {
    document.body.className = "";
  }

  // getting current user uid
  function GetUserUid () {
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
      productsArray.push({
        ...data
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  // getting number of items in users cart
  function GetNumberOfCartItems () {
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(collection(db, 'Cart ' + user.uid), (snapshot) => {
            // console.log(snapshot);
            const qty = snapshot.docs.length;
            // console.log(qty);
            setTotalProducts(qty);
          });
        }
      });
    }, []);
  }
  GetNumberOfCartItems();
  // console.log("tot prod:" + totalProducts);

  // global variable
  let Product;

  const addToKart = async (product: any) => {
    if (uid !== null && uid !== undefined && uid !== '') {
      Product = product;
      Product.qty = 1;
      Product.TotalProductPrice = Product.qty * Product.price;
      await setDoc(doc(db, 'Cart ' + uid, product.ID), Product);

    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    {/* //if dark mode is enabled then add dark class to body
    {darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark')} */}
      <Navbar user={user} totalProducts={totalProducts} />
      <br></br>
      {products.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Products</h1>
          <div className="products-box">
            <MemoProducts products={products} addToCart={addToKart} />
            {/* <Products products={products} addToCart={addToKart} /> */}
          </div>
        </div>
      )}
      {products.length < 1 && (
        <div className="container-fluid">
          <br/>
          <div className='loading'></div></div>
      )}
    </>
  );
};
