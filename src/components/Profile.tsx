/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { logOut, deleteUserr } from '../redux/features/auth/authService';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useSelector((state: any) => state.authReducer.user);
  // console.log(user);

  async function handleLogout() {
    setError('');
    try {

      dispatch(logOut());
      window.location.href = '/';

    } catch {
      setError('Failed to log out');
    }
  }
  function deleteAccount() {
    setError('');
    try {
      dispatch(deleteUserr());
      // window.location.href = '/';
    } catch {
      setError('Failed to delete the account');
    }

  }
  return (
    <>
      <Card className='profile-card'>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Name:</strong> {user?.displayName}
          <br />
          <strong>Email:</strong> {user?.email}
          <Button
            onClick={() => navigate('/update-profile')}
            className='btn btn-dark w-100 mt-2'
          >
            Update Profile
          </Button>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button

          className='btn btn-dark mt-2'
          onClick={() => {
            const confirmBox = window.confirm(
              'Do you really want to delete this account?'

            );
            if (confirmBox === true) {
              deleteAccount();
            }
          }}
        >
          Delete my account!
        </Button>
        <br />
        <Button className='btn btn-dark mt-2' onClick={handleLogout}>
          Log Out
        </Button>
        <br />
      </div>
    </>
  );


};

export default Profile;
