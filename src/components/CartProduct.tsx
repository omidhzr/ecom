/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { minus } from 'react-icons-kit/feather/minus';
import { ecommerce_cart_remove } from 'react-icons-kit/linea/ecommerce_cart_remove'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { decreaseQuantity, deleteFromCart, increaseQuantity } from '../redux/features/cart/cartService';

export const CartProduct = ({ cartProduct }: { cartProduct: any; }) => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.authReducer.user?.email);

  const handleCartIncrease = () => {
    // dispatch increase action
    if (email !== null && email !== undefined && email !== '') {
      // console.log(email, cartProduct.ID);
      dispatch(increaseQuantity({ cartProduct, email }));
    }
  };

  const handleCartDecrease = () => {
    if (email !== null && email !== undefined && email !== '') {
      dispatch(decreaseQuantity({ cartProduct, email }));
    }
  };

  const handleCartDelete = () => {

    //dispatch deleteFromCart action
    if (email !== null && email !== undefined && email !== '') {
      dispatch(deleteFromCart({ cartProduct, email }));
    }

  };


  return (
    <tr>
      <td>
        <div className="product-img">
          <img src={cartProduct.url} alt={cartProduct.title} />
        </div>
      </td>
      <td>{cartProduct.title}</td>
      <td>${cartProduct.price}</td>
      <td>
        <div className="qty-box">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleCartDecrease}
              >
                <Icon icon={minus} size={24} />
              </button>
            </div>
            <input
              type="text"
              className="form-control text-center disabled"
              value={cartProduct.quantity}
              readOnly
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleCartIncrease}
              >
                <Icon icon={plus} size={24} />
              </button>
            </div>
          </div>
        </div>
      </td>
      <td>${cartProduct.totalPrice}</td>
      <td>
        <div className="delete-btn">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={handleCartDelete}
          >
            <Icon icon={ecommerce_cart_remove} size={24} />
          </button>
        </div>
      </td>
    </tr>
  );
}

