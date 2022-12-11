/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { CartProduct } from '../components/CartProduct';

export const CartPage = ({ cartItems, navigate }: { cartItems: any, navigate: any }) => {

  return (
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
                      {/* // if cartItems length is 0, show empty fragment */}
                      {cartItems.length === 0 ? (
                        <>
                        </>
                      ) : (
                        // else show cart items
                        cartItems.map((item: any) => (
                          <CartProduct key={item.ID} cartProduct={item} />
                        ))
                      )}
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
  );
};

export default CartPage;

