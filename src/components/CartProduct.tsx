import React from 'react';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { minus } from 'react-icons-kit/feather/minus';
import { auth, db } from '../config/config';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'

export const CartProduct = ({ cartProduct }: {
  cartProduct: any;
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
        deleteDoc(doc(db, 'Cart ' + user.uid, cartProduct.ID));
      }
    });
  };
  
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
              value={cartProduct.qty}
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
      <td>${cartProduct.totalProductPrice}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={handleCartDelete}
        >
          <Icon icon={iosTrashOutline} size={24} />
        </button>
      </td>
    </tr>
  );
}

