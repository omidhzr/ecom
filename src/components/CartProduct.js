import React from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";
import { auth, db } from "../config/Config";
import { deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const CartProduct = ({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
}) => {
  const handleCartIncrease = () => {
    cartProductIncrease(cartProduct);
  };

  const handleCartDecrease = () => {
    cartProductDecrease(cartProduct);
  };

  const handleCartDelete = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        deleteDoc(doc(db, "Cart " + user.uid, cartProduct.ID));
        // .then(() => {
        //   console.log("successfully deleted");
        // });
      }
    });
  };

  return (
    <div className="product">
      <div className="product-img">
        <img src={cartProduct.url} alt="product-img" />
      </div>
      <div className="product-text title">{cartProduct.title}</div>
      <div className="product-text description">{cartProduct.description}</div>
      <div className="product-text price">$ {cartProduct.price}</div>
      {/* <span>Quantity</span> */}
      <div className="product-text quantity-box">
        <div className="action-btns minus" onClick={handleCartDecrease}>
          <Icon icon={minus} size={20} />
        </div>
        <div>{cartProduct.qty}</div>
        <div className="action-btns plus" onClick={handleCartIncrease}>
          <Icon icon={plus} size={20} />
        </div>
      </div>
      {/* <div className="product-text cart-price">
        $ {cartProduct.totalProductPrice}
      </div> */}
      <div
        className="btn btn-danger btn-md cart-btn"
        onClick={handleCartDelete}
      >
        DELETE
      </div>
    </div>
  );
};
