import React, { MutableRefObject, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import { updateProfilee, updateEmaill, updatePass } from '../redux/features/auth/authService';

const UpdateProfile = () => {
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordConfirmRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [errorMsg, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useAppSelector((state: any) => state.authReducer.user);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: any) => state.authReducer);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function handleSubmit(e: any) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');

    // if the value of the inputs for name, email and password are not equal to the current user's displayName, email and password, then update the user's displayName, email and password
    if (nameRef.current.value !== user.displayName) {
      dispatch(updateProfilee(nameRef.current.value));
    }
    if (emailRef.current.value !== user.email) {
      dispatch(updateEmaill(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      console.log(passwordRef.current.value);
      dispatch(updatePass(passwordRef.current.value));
    }

    navigate('/');
  }

  return (
    <>
      {user && <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                required
                defaultValue={user.displayName}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={user.email}
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
