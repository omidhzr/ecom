/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Alert, Button } from 'react-bootstrap';

// interface Props
interface Props {
  error: any;
  clearErr: any;
  sendMsg: any;
}
export const ContactPage = ({ error, clearErr, sendMsg }: Props) => {

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    message: Yup.string().required('Required'),
  });

  return (
    <div className="container">
      <br />
      <h2>Contact us!</h2>
      <hr />
      <br />
      {error && (
        <Alert variant="danger" onClose={clearErr} dismissible>
          {error}
        </Alert>
      )}
      <br />
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={sendMsg}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label className="form-label">Name</label>
              <Field type="text" name="name" className="form-control" placeholder="Enter your name" />
              <ErrorMessage name="name" component="div" />

              <label className="form-label">Email</label>
              <Field type="email" name="email" className="form-control" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" />

              <label className="form-label">Message</label>
              <Field as="textarea" name="message" className="form-control" placeholder="Enter your message" />
              <ErrorMessage name="message" component="div" />

              <Button type="submit" disabled={isSubmitting} className="btn btn-primary">Send</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}