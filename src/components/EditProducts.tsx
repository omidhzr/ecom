import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { storage, db } from '../config/config';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const EditProducts = () => {
  // set state of products with type
  const [products, setProducts] = useState<any>([]);
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [editButtonActive, setEditButton] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [pid, setPid] = useState<string>('');
  // const [addProductsButtonClicked, setAddProducts] = useState<boolean>(false);

  const getProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const products = await getDocs(collection(db, 'Products'));
      const productsArray = products.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsArray);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id: any, url: any) => {
    // setLoading(true);
    setError('');

    try {
      await deleteDoc(doc(db, 'Products', id));
      await deleteObject(ref(storage, url));
      // timeout for success message
      setSuccessMsg('Product deleted successfully');
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
      setLoading(false);
      getProducts();
    } catch (error: any) {
      setError(error.message);
      // refresh this page
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      // setLoading(false);
    }
  };

  // edit product data information in firebase firestore and firebase storage database when edit button is clicked and product data is changed
  const editProduct = async (id: any, title: any, description: any, price: any, url: any) => {
    // setLoading(true);
    setError('');

    try {
      await updateDoc(doc(db, 'Products', id), {
        title,
        price,
        description,
        url
      });
      // await updateObject(ref(storage, url), {
      //     name,
      //     price,
      //     description,
      //     category,
      //     quantity
      // }); // updateObject is used to update the image in firebase storage database
      setSuccessMsg('Product Edited successfully');
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
      // setLoading(false);
      getProducts();
    } catch (error : any) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleEdit = (pid: any) => {
    setPid(pid); // set pid to the product id so that we can update only that row in the table
    setEdit(true);
    setEditButton(true);
  };

  return (
    <div><h3>Edit</h3>
      <br/>
      {successMsg && <div className="success-msg">{successMsg}</div>}
      {loading ? (
        <>
          <div>Loading...</div>
          <br/>
          <div className="loading"></div>
        </>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br/>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {// map through products array and display products data
            // if edit button is clicked, replace td with input fields
            // if edit button is clicked and product data is changed in the table row, update product data in firebase firestore and firebase storage database
            products.map((product: any) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {edit && product.id === pid
                    ? (
                      <Form.Control
                        type="text"
                        placeholder="Enter title"
                        ref={titleRef}
                        defaultValue={product.title}
                      />
                    )
                    : (
                      product.title
                    )}
                </td>
                <td>
                  {edit && product.id === pid
                    ? (
                      <Form.Control
                        type="text"
                        placeholder="Enter description"
                        ref={descRef}
                        defaultValue={product.description}
                      />
                    )
                    : (
                      product.description
                    )}
                </td>
                <td>
                  {edit && product.id === pid
                    ? (
                      <Form.Control
                        type="text"
                        placeholder="Enter price"
                        ref={priceRef}
                        defaultValue={product.price}
                      />
                    )
                    : (
                      product.price
                    )}
                </td>
                <td>
                  {edit && product.id === pid
                    ? (
                      <Form.Control
                        type="text"
                        placeholder="Enter image url"
                        ref={imageRef}
                        defaultValue={product.url}
                      />
                    )
                    : (
                      <img src={product.url} alt={product.title} width="100" />
                    )}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        'Do you really want to delete this product?'
                      );
                      if (confirmBox === true) {
                        deleteProduct(product.id, product.url);
                      }
                    }}
                  >
                Delete
                  </Button>
                </td>
                <td>
                  {editButtonActive && product.id === pid ? (
                    <Button
                      variant="primary"
                      onClick={() => {
                        editProduct(
                          product.id,
                      titleRef.current?.value,
                      descRef.current?.value,
                      priceRef.current?.value,
                      imageRef.current?.value
                        );
                      }}
                    >
                  Edit
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleEdit(product.id);
                      }}
                    >
                  Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

  );
};

export default EditProducts;
