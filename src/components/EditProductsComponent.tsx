/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';

const EditProductsComponent = ({ products, loading, successMsg, error, deleteProduct, editProduct, edit, pid, handleEdit, editButtonActive, setEdit, setEditButton, setPid }: {
  products: any;
  loading: boolean;
  successMsg: string;
  error: string | null | undefined;
  deleteProduct: (id: string, url: string) => void;
  editProduct: (ID: string, name: string, price: string, description: string, image: string) => void;
  edit: boolean;
  pid: string;
  handleEdit: (id: string) => void;
  editButtonActive: boolean;
  setEdit: (edit: boolean) => void;
  setEditButton: (editButtonActive: boolean) => void;
  setPid: (pid: string) => void;
}) => {

  return (
    <div className='container'>
      <h1 className='text-center'>Edit Products</h1>
      {/* <h3>Edit</h3> */}
      <br />
      {successMsg && <div className="success-msg">{successMsg}</div>}
      {loading ? (
        <>
          <div>Loading...</div>
          <br />
          <div className="loading"></div>
        </>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      {/* <Table striped hover> */}

      <table className="table table-striped table-hover border">
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
            // if edit button is clicked, show a form and update the product data in firebase firestore
            // use formik to handle form data
            products.map((product: any) => (
              <tr key={product.ID}>
                <td>{product.ID}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td><img src={product.url} width='100px' alt="" /></td>
                <td><button className="btn btn-danger" onClick={() =>
                  // add confirmation message before deleting product
                  window.confirm('Are you sure you want to delete this product?') && deleteProduct(product.ID, product.url)}>Delete</button></td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEdit(product.ID)}>Edit</button>
                  {editButtonActive && pid === product.ID ? (
                    <>
                      <hr />

                      {/* <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" id="description" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" id="price" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input type="file" className="form-control" id="image" />
                        </div>
                    </form> */}
                      <Formik
                        initialValues={{
                          title: product.title,
                          description: product.description,
                          price: product.price,
                          url: product.url
                        }}
                        onSubmit={(values, { resetForm }) => {
                          editProduct(product.ID, values.title, values.description, values.price, values.url);
                          resetForm({});
                          setEditButton(false);
                        }}
                      >

                        {({ values, handleChange, handleSubmit }) => (
                          <Modal show={true} onHide={() => setEditButton(false)}>
                            <Form onSubmit={handleSubmit}>
                              <Modal.Header closeButton>
                                <Modal.Title>Edit Product</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                  <Form.Label>Title</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    placeholder="Enter title"
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                  <Form.Label>Price</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                  <Form.Label>Image</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="url"
                                    value={values.url}
                                    onChange={handleChange}
                                    placeholder="Enter image url"
                                    disabled
                                  />
                                </Form.Group>

                                {/* <Button variant="primary" type="submit">
                                  Save
                                </Button> */}

                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={() => setEditButton(false)}>
                                  Close
                                </Button>
                                <Button variant="success" type="submit">
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Form>
                          </Modal>
                        )}

                      </Formik>
                    </>
                  )
                    : null}
                </td>
              </tr>
            ))}
        </tbody>
      </table >
    </div >
  );
};

export default EditProductsComponent;


