import React from 'react';
import { Icon } from 'react-icons-kit';
// import { ecommerce_basket_plus } from 'react-icons-kit/linea/ecommerce_basket_plus'
import { cartPlus } from 'react-icons-kit/fa/cartPlus';
import { addToCart } from '../redux/features/cart/cartService';
import { useAppDispatch, useAppSelector } from "../redux/store";

export const Product = ({ product }: { product: any }) => {

  const dispatch = useAppDispatch();
  // get email from redux store to use in addToCart action
  const email = useAppSelector((state) => state.authReducer.user?.email);

  const handleAddToCart = async () => {

    // if user is logged in then add product to cart
    if (email !== null && email !== undefined && email !== '') {
      await dispatch(addToCart({ product, email }));
      // console.log(resp);
    }
    else {
      // redirect to login page
      window.location.href = '/login';
    }

  };
  return (
    <div className="product">
      <div className="product-img">
        <img src={product.url} alt="product-img" />
      </div>
      <div className="product-text title">{product.title}</div>
      <div className="product-text description">{product.description}</div>
      <div className="product-text price">$ {product.price}</div>
      <div className="btn btn-dark btn-md cart-btn" style={{ width: 200, height: 40 }} onClick={handleAddToCart}>
        ADD TO <Icon className="cart-btn cart-icon" icon={cartPlus} size={30} />
      </div>
    </div>
  );
};
