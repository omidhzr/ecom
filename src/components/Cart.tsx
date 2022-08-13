import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { auth, db } from '../config/config';
import { onSnapshot, collection, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { CartProducts } from './CartProducts';
import { onAuthStateChanged } from 'firebase/auth';
import GetCurrentUser from './GetCurrentUser';

const Cart = () => {
  // state of cart products
  const [cartProducts, setCartProducts] = useState([]);
  // const [loading, setLoading] = useState < boolean > (false);
  const user = GetCurrentUser();
  // console.log("Cart: user> " + user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(collection(db, 'Cart ' + user.uid), (snapshot) => {
          // eslint-disable-next-line no-empty-pattern
          const newCartProducts: any  = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data()
          }));

          setCartProducts(newCartProducts);
          // console.log("cart products: " + cartProducts);
        });
      } else {
        console.log('user is not signed in to retrieve cart');
      }
    });
  }, []);

  //   CartProducts();
  // console.log(cartProducts);

  // global variable
  let Product: any;

  // cart product increase function
  const cartProductIncrease = (cartProduct: any) => {
    // console.log(cartProduct);
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.totalProductPrice = Product.qty * Product.price;
    // updating in database
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setDoc(doc(db, 'Cart ' + user.uid, cartProduct.ID), Product);
        // .then(
        //   () => {
        //     console.log("successfully increased");
        //   }
        // );
      } else {
        console.log('user is not logged in to increment');
      }
    });
  };

  // cart product decrease functionality
  const cartProductDecrease = (cartProduct: any) => {
    Product = cartProduct;
    // check if qty is less than 1 if yes then delete the product
    if (Product.qty <= 1) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await deleteDoc(doc(db, 'Cart ' + user.uid, cartProduct.ID));

        } else {
          console.log('user is not logged in to delete');
        }
      });
    } else {
      Product.qty = Product.qty - 1;
      Product.totalProductPrice = Product.qty * Product.price;
      // updating in database
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await setDoc(doc(db, 'Cart ' + user.uid, cartProduct.ID), Product);

        } else {
          console.log('user is not logged in to decrement');
        }
      });
    }
  };

  return (
    <>
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
      {/* // if cart is empty then show this message to user "No products in the cart"
      // else if page is loading then show this message to user "Loading..."
      // else show the cart products */}
      {cartProducts.length === 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Cart</h1>
          <div className="products-box">
            <h1 className="text-center">No products in the cart</h1>
          </div>
        </div>
      )}
    </>
  );
};


//       {cartProducts.length < 1 && (
//         <div className="container-fluid">
//           <h3 className="text-center">Loading...</h3>
//         </div>
//       )}
//     </>
//   );
// };

export default Cart;
