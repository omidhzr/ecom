import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { auth, db } from "../config/Config";
import {
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserAuth, AuthContextProvider } from "../context/AuthContext";

export const Home = (props) => {
  const navigate = useNavigate();
  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // state of products
  const [products, setProducts] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [docId, setDocId] = useState(null);
  // const [docData, setDocData] = useState([]);
  const { user } = UserAuth();
  // console.log("Home: user> " + user?.displayName);

  // getting current user uid
  // function GetUserUid() {
  //   const [uid, setUid] = useState(null);
  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUid(user.uid);
  //       }
  //     });
  //   }, []);
  //   return uid;
  // }

  // const uid = GetUserUid();
  // console.log('uid: '+ uid);

  // getting current user function
  // function GetCurrentUser() {
  //   const [user, setUser] = useState(null);
  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUser(user?.displayName);
  //       } else {
  //         setUser(null);
  //       }
  //     });
  //   }, []);
  //   return user;
  // }

  // const user = GetCurrentUser();
  // console.log(user);

  // getting products function
  const getProducts = async () => {
    const products = await getDocs(collection(db, "Products"));
    const productsArray = [];
    for (var snap of products.docs) {
      // console.log(snap.data().url);
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

  // getting number of items in users cart
  function GetNumberOfCartItems() {
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(collection(db, "Cart " + user.uid), (snapshot) => {
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

  // add to cart
  const addToCart = async (product) => {
    console.log("product to add > " + product.ID);

    // Produkt = product;
    // check if user is logged in
    if (user.uid !== null) {
      // console.log(product);
      // check if product is already in user's cart and update qty if it is already in cart

      // try {
      const q = query(
        collection(db, "Cart " + user?.uid),
        where("ID", "==", product.ID)
      );

      const sub = onSnapshot(q, (querySnapshot) => {
        // console.log("querySnapshot: " + querySnapshot.docs[0].data().ID);
        querySnapshot.forEach(function (dok) {
          setDocId(dok.id);
          console.log(dok.id, " => ", dok.data());
        });
      });
      const dk = sub();
      console.log("new sub docId: " + dk);
      console.log("Home.js> docId: " + docId);
      if (docId === null) {
        //if product is not in cart, add it
        const newDoc = await addDoc(collection(db, "Cart " + user.uid), {
          ID: product.ID,
          title: product.title,
          price: Number(product.price),
          qty: Number(1),
          total: Number(product.price),
        });
        console.log("newDoc: " + newDoc.id);
      }
      // if product is not in cart, add it to cart
      else {
        const docRef = doc(db, "Cart " + user.uid, docId);

        // Produkt["total"] = product.qty * product.price;
        // console.log("Produk tot price issssss: " + Produkt["total"]);

        // Atomically increment the qty of the product in the cart
        await updateDoc(docRef, {
          qty: increment(1),
          total: increment(product.price),
        });
        // const docRef = doc(db, "Cart " + uid);
      }
    } else {
      // if user is not logged in, redirect to login
      navigate("/login");
    }
  };

  const addToKart = async (product) => {
    console.log("user: " + user.uid);
    if (user.uid !== null) {
      // console.log(product);
      Product = product;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      await setDoc(doc(db, "Cart " + user.uid, product.ID), Product);
      // .then(
      //   () => {
      //     console.log("successfully added to cart");
      //   }
      // );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <br></br>
      {products.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Products</h1>
          <div className="products-box">
            <Products products={products} addToCart={addToKart} />
          </div>
        </div>
      )}
      {products.length < 1 && (
        <div className="container-fluid">Please wait....</div>
      )}
    </>
  );
};
