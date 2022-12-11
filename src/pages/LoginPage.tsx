/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

// interface Props for Login page
interface Props {
  showPassword: any;
  setShowPassword: any;
  loginToApp: any;
  error: any;
  clearErr: any;
}
export const LoginPage = ({ showPassword, setShowPassword, loginToApp, error, clearErr }: Props) => {
  // use yup to validate the form
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div className="container">
      <br />
      <h2>Log in!</h2>
      <hr />
      {error && (
        <Alert variant="danger" onClose={clearErr} dismissible>
          {error}
        </Alert>
      )}
      <br />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={loginToApp}
      >
        {({ handleSubmit, handleChange, isSubmitting, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                as={Field}
                onChange={handleChange}
                isInvalid={!!errors.email}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter password"
                  as={Field}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  isValid={touched.password && !errors.password}
                  autoComplete="off"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Button variant="success" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <br />
      <span>Don't have an account yet? Register <Link to="../Signup">Here!</Link>
      </span>
      <br />
      <span>Forgot your password? Reset <Link to="../reset-password">Here!</Link>
      </span>
    </div>
  );
};

