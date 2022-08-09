import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { forgotPassword } = UserAuth();

  const resetPassword = async (e: any) => {
    e.preventDefault();
    setError('');
    try {
      await forgotPassword(email);
      setMessage('An email has been sent! Please check your email (and spams) to reset the password!');
      setTimeout(
        function () {
          navigate('../Login');
        }
        , 8000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='container'>
      <br />
      <h2>Forgot your password ... :( </h2>
      <br />
      {message && <span className='success-msg'>{message}</span>}
      <br/>
      <br/>
      <form autoComplete="off" className='form-group' onSubmit={resetPassword}>
        <label htmlFor="email">Email</label>
        <input type="email" className='form-control' required
          onChange={(e) => setEmail(e.target.value)} value={email} />
        <br/>
        <button type="submit" className='btn btn-success btn-md mybtn'>Submit!</button>
      </form>
      <br/>
      {error && <span className='error-msg'>{error}</span>}
      <br/>
      <span>Login <Link to="../Login">Here!</Link> </span>
      <br/>
      <span>Don't have an account yet? Register <Link to="../Signup">Here!</Link>
      </span>
    </div>
  );
};

export default ForgotPassword;
