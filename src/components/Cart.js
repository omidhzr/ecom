import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { auth, db } from "../config/Config";
import { onSnapshot, collection, setDoc, doc } from "firebase/firestore";
import { CartProducts } from "./CartProducts";
import { onAuthStateChanged } from "firebase/auth";
import GetCurrentUser from "./GetCurrentUser";

const Cart = () => {
  // state of cart products
  const [cartProducts, setCartProducts] = useState([]);

  const user = GetCurrentUser();
  // console.log("Cart: user> " + user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(collection(db, "Cart " + user.uid), (snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));

          setCartProducts(newCartProduct);
          // console.log("cart products: " + cartProducts);
        });
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, []);

  //   CartProducts();
  // console.log(cartProducts);

  // global variable
  let Product;

  // cart product increase function
  const cartProductIncrease = (cartProduct) => {
    // console.log(cartProduct);
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.totalProductPrice = Product.qty * Product.price;
    // updating in database
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setDoc(doc(db, "Cart " + user.uid, cartProduct.ID), Product);
        // .then(
        //   () => {
        //     console.log("successfully increased");
        //   }
        // );
      } else {
        console.log("user is not logged in to increment");
      }
    });
  };

  // cart product decrease functionality
  const cartProductDecrease = (cartProduct) => {
    Product = cartProduct;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.totalProductPrice = Product.qty * Product.price;
      // updating in database

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await setDoc(doc(db, "Cart " + user.uid, cartProduct.ID), Product);
          // .then(() => {
          //   console.log("successfully decremented");
          // });
        } else {
          console.log("user is not logged in to decrement");
        }
      });
    }
  };

  // set totalProducts in Navbar
  const totalProducts = cartProducts.reduce(
    (total, cartProduct) => total + cartProduct.qty,
    0
  );

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <br></br>
      {cartProducts.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Cart</h1>
          <div className="products-box">
            <CartProducts
              cartProducts={cartProducts}
              cartProductIncrease={cartProductIncrease}
              cartProductDecrease={cartProductDecrease}
            />
          </div>
        </div>
      )}
      {cartProducts.length < 1 && (
        <div className="container-fluid">No products to show</div>
      )}
    </>
  );
};
export default Cart;