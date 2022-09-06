import React, { MutableRefObject, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { UserAuth, AuthContextProvider } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordConfirmRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { user, updatePass, updateEmajl, updateUser } = UserAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  function handleSubmit (e: any) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');
    // @ts-ignore
    if (nameRef.current.value !== user!.displayName) {
      promises.push(updateUser(nameRef.current.value));
    }
    // @ts-ignore
    if (emailRef.current.value !== user!.email) {
      promises.push(updateEmajl(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePass(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError('Failed to update the account! ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
      <>
        {user && <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={nameRef}
                  required
                  defaultValue={user!.displayName}
                />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={user!.email}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <br />
              <Button
                disabled={loading}
                className="btn btn-praimary w-100 mt-2"
                type="submit"
              >
                UPDATE
              </Button>
            </Form>
          </Card.Body>
        </Card>
        }
        <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link>
        </div>
      </>
  );
};

export default UpdateProfile;
