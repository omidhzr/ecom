import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { signIn } from '../redux/features/auth/authService';


export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginToApp = async (e: any) => {
    e.preventDefault();

    // dispatch signIn
    const response = await dispatch(signIn({ submittedEmail: email, submittedPassword: password }));
    // if there is no error, navigate to home page
    if (response.payload) {
      navigate('/');
    }

  };

  const error = useAppSelector((state) => state.authReducer.error);

  return (
    <div className="container">
      <br />
      <h2>Login</h2>
      <br />
      {error && <Alert variant="danger">{error}</Alert>}
      <br />
      <form autoComplete="off" className="form-group" onSubmit={loginToApp}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="demo@test.com"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        />
        <br />
        <button type="submit" className="btn btn-success btn-md mybtn">
          LOGIN
        </button>
      </form>
      <br />

      <span>
        Don't have an account? Register <Link to="../Signup">Here!</Link>
      </span>
      <br />
      <span>
        Forgott your password?{' '}
        <Link to="../forgot-password">Forgot my password!</Link>
      </span>
    </div>
  );
};

