import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { signUp } from '../redux/features/auth/authService';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { clearError } from '../redux/features/auth/authSlice';

export const Signup = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.authReducer);


  const Register = async (e: any) => {
    e.preventDefault();
    // setError('');

    // dispatch signUp action
    const response = await dispatch(signUp({ submittedName: name, submittedEmail: email, submittedPassword: password }));

    // TODO: we currently get error 400 from backend in the console exposing the API key if there is an error such as user already exists, there is no way to suppress it according to:
    // https://stackoverflow.com/questions/49096911/firebase-createuserwithemailandpassword-returning-http-post-error-failure-alon
    // if there is no error, navigate to home page
    if (response.payload) {
      navigate('/');
    }

  };


  return (
    <div className="container">
      <br />
      <h2>Sign up!</h2>
      <hr />
      {error && (
        <Alert variant="danger" onClose={() => dispatch(clearError())} dismissible>
          {error}
        </Alert>
      )}
      <br />
      <form autoComplete="off" className="form-group" onSubmit={Register}>
        <label htmlFor="Name">Name</label>
        <br />
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <label htmlFor="Email">Email</label>
        <br />
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label htmlFor="Password">Password</label>
        <br />
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button type="submit" className="btn btn-success btn-md mybtn">
          Register
        </button>
      </form>
      <br />

      <span>
        Already have an account? Login <Link to="../Login">Here!</Link>
      </span>
    </div>
  );
};
