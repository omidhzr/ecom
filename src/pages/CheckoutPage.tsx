/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import { createOrder } from '../redux/features/order/orderService';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CheckoutPageProps {
    totalPrice: number;
    cartItems: any;
    pay: any;
    userEmail: string | undefined | null;
    addOrder: any;
}

const CheckoutPage = ({ totalPrice, cartItems, pay, userEmail, addOrder }: CheckoutPageProps) => {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('name is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        zip: Yup.string().required('Zip is required'),
        country: Yup.string().required('Country is required'),
    });

    const notify = (message: string, type: string) => {
        const options: ToastOptions = {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };
        switch (type) {
            case 'success':
                toast.success(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            default:
                toast(message, options);
                break;
        }
    };


    return (
        <Container>
            <ToastContainer position="top-right" />
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>Checkout</h1>
                    <Formik
                        initialValues={{
                            name: '',
                            address: '',
                            city: '',
                            zip: '',
                            country: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            addOrder(values);
                            pay();
                            setSubmitting(false);
                            notify('Order placed successfully', 'success');
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
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        isInvalid={!!errors.name}
                                        isValid={touched.name && !errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        placeholder="Enter address"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}
                                        isInvalid={!!errors.address}
                                        isValid={touched.address && !errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        placeholder="Enter city"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                        isInvalid={!!errors.city}
                                        isValid={touched.city && !errors.city}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="zip">
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="zip"
                                        placeholder="Enter postal code"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.zip}
                                        isInvalid={!!errors.zip}
                                        isValid={touched.zip && !errors.zip}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.zip}
                                    </Form.Control.Feedback>

                                </Form.Group>
                                <Form.Group controlId="country">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        placeholder="Enter country"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.country}
                                        isInvalid={!!errors.country}
                                        isValid={touched.country && !errors.country}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.country}
                                    </Form.Control.Feedback>

                                </Form.Group>
                                <br />
                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    Pay {totalPrice} SEK
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container >
    )
}

export default CheckoutPage

