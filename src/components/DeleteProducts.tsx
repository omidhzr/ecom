/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { storage, db } from '../config/config';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import AddProducts from './AddProducts';
import EditProducts from './EditProducts';
// used github copilot for this page
// delete products from firebase storage and firestore database when delete button is clicked
// using firebase 9.0.0

const DeleteProducts = () => {
  // set state of products with type
  const [products, setProducts] = useState < any > ([]);
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState < boolean > (false);
  const [successMsg, setSuccessMsg] = useState < string > ('');
  const [edit, setEdit] = useState < boolean > (false);
  const [editButtonActive, setEditButton] = useState < boolean > (false);
  const [error, setError] = useState < string > ('');
  const titleRef = useRef < HTMLInputElement > (null);
  const priceRef = useRef < HTMLInputElement > (null);
  const descRef = useRef < HTMLInputElement > (null);
  const imageRef = useRef < HTMLInputElement > (null);
  const [pid, setPid] = useState < string > ('');
  const [addProductsButtonClicked, setAddProducts] = useState < boolean > (false);
  const [editProductsButtonClicked, setEditProducts] = useState < boolean > (false);

  return (
    <div className="container">
      <div className="row">
        <br></br>
        <br></br>
        <h1>Admin Page</h1>
        <hr />
        <Button
          variant="primary"
          onClick={() => setAddProducts(!addProductsButtonClicked)}
        >
            Add Products
        </Button>
        <br />
        <Button
          variant="secondary"
          onClick={() => setEditProducts(!editProductsButtonClicked)}
        >
            Edit Products
        </Button>

        <div className="col-md-12">

          {successMsg && <div className="success-msg">{successMsg}</div>}
          {error ? <p>{error}</p> : null}

          {/* //button to toggle Add products when clicked */}

          {addProductsButtonClicked
            ? (
              <AddProducts/>
            )
            : null}

          <br></br>

          {editProductsButtonClicked && (
            <EditProducts/>
          )}
        </div>

      </div>

    </div> // end of container
  );
};

/*
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {edit ? (
                      <Form.Control
                        type="text"
                        ref={titleRef}
                        required
                        defaultValue={product.title}
                      />
                    ) : (
                      product.title
                    )}
                  </td>
                  <td>
                    {edit ? (
                      <Form.Control
                        type="text"
                        ref={descRef}
                        required
                        defaultValue={product.description}
                      />
                    ) : (
                      product.description
                    )}
                  </td>
                  <td>
                    {edit ? (
                      <Form.Control
                        type="text"
                        ref={priceRef}
                        required
                        defaultValue={product.price}
                      />
                    ) : (
                      product.price
                    )}
                  </td>
                  <td>
                    <img src={product.url} alt={product.title} width="100" />
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete this account?"
                        );
                        if (confirmBox === true) {
                          deleteProduct(product.id, product.url);
                        }
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    {editButtonActive ? (
                      <Button
                        onClick={() =>
                          editProduct(
                            product.id,
                            titleRef.current.value,
                            descRef.current.value,
                            priceRef.current.value
                          )
                        }
                        className="btn btn-primary"
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleEdit(product.id)}
                        className="btn btn-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; */

export default DeleteProducts;
