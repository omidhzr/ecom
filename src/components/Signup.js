import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { UserAuth } from "../context/AuthContext";

export const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser, updateUser } = UserAuth();

  const Register = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(name, email, password);
      // updateUser(name);
      navigate("../");
    } catch (error) {
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
