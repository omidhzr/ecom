/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

// interface Props for Signup page
interface Props {
  error: any;
  Register: any;
  clearErr: any;
}

export const SignupPage = ({ error, Register, clearErr }: Props) => {


  const schema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character or Symbol'
      ),
  })


  return (

    <div className="container">
      <br />
      <h2>Sign up!</h2>
      <hr />
      {error && (
        <Alert variant="danger" onClose={clearErr} dismissible>
          {error}
        </Alert>
      )}
      <br />
      <Formik
        validationSchema={schema}
        onSubmit={Register}
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="validationFormik01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                isValid={touched.name && !errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik03">
              <Form.Label>Password</Form.Label>
              {/* // make the password field a password field with the eye icon to show/hide password */}
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  isValid={touched.password && !errors.password}
                  autoComplete="off"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>

              </InputGroup>
            </Form.Group>
            <br />
            <Button type="submit">Sign Up!</Button>
          </Form>
        )}
      </Formik>
      <br />
      <span>
        Already have an account? Login <Link to="../Login">Here!</Link>
      </span>
    </div>
  );
};
