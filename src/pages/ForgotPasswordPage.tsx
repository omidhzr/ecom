/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { Alert, Button, Form } from 'react-bootstrap';

// interface Props for Forgot Password page
interface Props {
  error: any;
  clearErr: any;
  resetPassword: any;
}


const ForgotPassword = ({ error, clearErr, resetPassword }: Props) => {

  return (
    <div className="container">
      <br />
      <h2>Forgot your password...? :( </h2>
      <br />
      <br />
      {error && (
        <Alert variant="danger" onClose={clearErr} dismissible>
          {error}
        </Alert>
      )}
      <br />
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values.email)
          setSubmitting(false);
        }}

      >
        {({ handleSubmit, handleChange, touched, errors }) => (
          <Form autoComplete="off" className="form-group" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                <ErrorMessage name="email" />
                {errors.email}
              </Form.Control.Feedback>

              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>

            </Form.Group>
            <Button variant="primary" type="submit">
              Send Email
            </Button>
          </Form>
        )}
      </Formik>

      <br />
      <span>Login <Link to="../Login">Here!</Link> </span>
      <br />
      <span>Don't have an account yet? Register <Link to="../Signup">Here!</Link>
      </span>
    </div >


  );
}

export default ForgotPassword;
