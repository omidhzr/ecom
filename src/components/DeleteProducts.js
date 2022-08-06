import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { storage, db } from "../config/Config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
// used github copilot for this page
// delete products from firebase storage and firestore database when delete button is clicked
// using firebase 9.0.0

const DeleteProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [edit, setEdit] = useState(false);
  const [editButtonActive, setEditButton] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const [pid, setPid] = useState("");

  const getProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const products = await getDocs(collection(db, "Products"));
      const productsArray = products.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id, url) => {
    // setLoading(true);
    setError("");

    try {
      await deleteDoc(doc(db, "Products", id));
      await deleteObject(ref(storage, url));
      // timeout for success message
      setSuccessMsg("Product deleted successfully");
      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
      setLoading(false);
      getProducts();
    } catch (error) {
      setError(error.message);
      // refresh this page
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      // setLoading(false);
    }
  };

  // edit product data information in firebase firestore and firebase storage database when edit button is clicked and product data is changed
  // using firebase 9.0.0
  const editProduct = async (id, title, description, price, url) => {
    // setLoading(true);
    setError("");

    try {
      await updateDoc(doc(db, "Products", id), {
        title,
        price,
        description,
        url,
      });
      // await updateObject(ref(storage, url), {
      //     name,
      //     price,
      //     description,
      //     category,
      //     quantity
      // }); // updateObject is used to update the image in firebase storage database
      setSuccessMsg("Product Edited successfully");
      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
      // setLoading(false);
      getProducts();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleEdit = (pid) => {
    setPid(pid); // set pid to the product id so that we can update only that row in the table
    setEdit(true);
    setEditButton(true);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <br></br>
          <br></br>
          <h1>Admin Page</h1>
          <hr />
          {successMsg && <div className="success-msg">{successMsg}</div>}
          {loading ? <p>Loading...</p> : null}
          {error ? <p>{error}</p> : null}
          <Button
            variant="primary"
            onClick={() => {
              window.location.href = "/add-products";
            }}
          >
            Add Products
          </Button>
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
              {
                // map through products array and display products data
                // if edit button is clicked, replace td with input fields
                // if edit button is clicked and product data is changed in the table row, update product data in firebase firestore and firebase storage database
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      {edit && product.id === pid ? (
                        <Form.Control
                          type="text"
                          placeholder="Enter title"
                          ref={titleRef}
                          defaultValue={product.title}
                        />
                      ) : (
                        product.title
                      )}
                    </td>
                    <td>
                      {edit && product.id === pid ? (
                        <Form.Control
                          type="text"
                          placeholder="Enter description"
                          ref={descRef}
                          defaultValue={product.description}
                        />
                      ) : (
                        product.description
                      )}
                    </td>
                    <td>
                      {edit && product.id === pid ? (
                        <Form.Control
                          type="text"
                          placeholder="Enter price"
                          ref={priceRef}
                          defaultValue={product.price}
                        />
                      ) : (
                        product.price
                      )}
                    </td>
                    <td>
                      {edit && product.id === pid ? (
                        <Form.Control
                          type="text"
                          placeholder="Enter image url"
                          ref={imageRef}
                          defaultValue={product.url}
                        />
                      ) : (
                        <img
                          src={product.url}
                          alt={product.title}
                          width="100"
                        />
                      )}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete this product?"
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
                              titleRef.current.value,
                              descRef.current.value,
                              priceRef.current.value,
                              imageRef.current.value
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
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

{
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
}

export default DeleteProducts;
