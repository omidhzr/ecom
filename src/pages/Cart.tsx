/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartProduct } from '../components/CartProduct';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchCart } from '../redux/features/cart/cartService';

export const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userEmail = useAppSelector((state) => state.authReducer.user?.email);
  // console.log('userEmail: ' + userEmail);

  useEffect(() => {
    if (userEmail !== null && userEmail !== undefined && userEmail !== '') {
      dispatch(fetchCart(userEmail));
    }
  }, [dispatch, userEmail]);


  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  // console.log(cartItems.length);

  return (
    <>
      <br></br>
      {/* if cart is empty then show this message to user "No products in the cart"*/}
      {cartItems?.length === 0 && (
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
      {cartItems?.length > 0 && (
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
                          {cartItems.map((product: any) => (
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
                          <strong><h3>Total: {cartItems.reduce((acc: any, item: any) => acc + item.totalPrice, 0)}</h3></strong>
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
    </>
  );
};

export default Cart;
