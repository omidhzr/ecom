/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

interface Props {
  user: any;
  error: any;
  loading: boolean;
  update: any;
  showPassword: any;
  setShowPassword: any;

}
const UpdateProfilePage = ({ user, error, update, showPassword, setShowPassword }: Props) => {

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),

  });



  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik
            initialValues={{ name: '', email: '', password: '', passwordConfirm: '' }}
            validationSchema={validationSchema}
            onSubmit={update}
          >
            {({ handleSubmit, handleChange, isSubmitting, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="name"
                    name="name"
                    placeholder={user?.displayName || 'Enter name'}
                    defaultValue={user?.displayName || ''}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    isValid={touched.name && !errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={user?.email || "Enter email"}
                    defaultValue={user?.email || ''}
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
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <br />
                <Form.Group controlId="passwordConfirm">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      // eslint-disable-next-line no-constant-condition
                      type={showPassword ? 'text' : 'password'}
                      name="passwordConfirm"
                      placeholder="Enter password"
                      as={Field}
                      onChange={handleChange}
                      isInvalid={!!errors.passwordConfirm}
                      isValid={touched.passwordConfirm && !errors.passwordConfirm}
                      autoComplete="off"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.passwordConfirm}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <br />
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Update
                </Button>
                <br />
                <br />
                <Link to="/">Cancel</Link>

              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>

    </>
  );
};

export default UpdateProfilePage;
