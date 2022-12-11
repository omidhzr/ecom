/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Formik } from 'formik';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';


const AddProductsComponent = ({ error, handleAddProduct, handleProductImg, progress }: { error: string | null | undefined, handleAddProduct: any, handleProductImg: any, progress: number }) => {


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Add Product</h1>
          <hr />
          <Formik
            initialValues={{
              title: '',
              description: '',
              price: 0,
              image: null
            }}
            validationSchema={Yup.object({
              title: Yup.string().required('Required'),
              description: Yup.string().required('Required'),
              price: Yup.number().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleAddProduct(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title && touched.title && errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {errors.description && touched.description && errors.description}
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                  {errors.price && touched.price && errors.price}
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image</Form.Label>

                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleProductImg}
                    onBlur={handleBlur}
                  />

                  {errors?.image && touched?.image && errors?.image}
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div >
  );
};


export default AddProductsComponent;
