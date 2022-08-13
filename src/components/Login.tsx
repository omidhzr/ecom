import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const login = async (e: any) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
        navigate('/');
      // navigate('../');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <br />
      <h2>Login</h2>
      <br />
      {error && <Alert variant="danger">{error}</Alert>}
      <br />
      <form autoComplete="off" className="form-group" onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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



