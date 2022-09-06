import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext';

export const Signup = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const Register = async (e: any) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(name, email, password);
      // updateUser(name);
      navigate('../');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <br />
      <h2>Sign up!</h2>
      <hr />
      {error && <Alert variant="danger">{error}</Alert>}
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
