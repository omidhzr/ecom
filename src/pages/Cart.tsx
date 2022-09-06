import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/config';
import { onSnapshot, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { CartProduct } from '../components/CartProduct';

const Cart = () => {
  // state of cart products
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

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

  return (
    <>
      <br></br>
      {cartProducts.length > 0 && (
      <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Cart</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Product Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((product: any) => (
                        <CartProduct key={product.ID} cartProduct={product} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-md-12">

                    <div className="footer-total">
                      <strong><h3>Total: ${cartProducts.reduce((a, b) => a + b!.totalProductPrice, 0)}</h3></strong>
                    </div>

                    <div className="footer-checkout-btn">
                      <button className="btn btn-success" onClick={() => navigate('/checkout')}>Checkout</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </>
      )}
      {/* if cart is empty then show this message to user "No products in the cart"
      // else show the cart products */}
      {cartProducts.length === 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Cart</h1>
          <div className="products-box">
            <h1 className="text-center">No products in the cart</h1>
          </div>
          <div className="text-center">
            <Link to="/" className="btn btn-outline-dark"> Continue Shopping </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;