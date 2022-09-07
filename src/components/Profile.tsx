import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [error, setError] = useState('');
  const { user, logOut, removeUser } = UserAuth();
  const navigate = useNavigate();

  async function handleLogout () {
    setError('');

    try {
      await logOut();
      window.location.href = '/';
    } catch {
      setError('Failed to log out');
    }
  }
  async function deleteAccount () {
    setError('');

    try {
      await removeUser(user);
      window.location.href = '/';
    } catch (error: any) {
      setError('Failed to Delete the user ' + error.message);
    }
  }

  return (
    <>
      <Card className='profile-card'>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <strong>Name:</strong> {
          user?.displayName || 'Name'}
          <br />

          <strong>Email:</strong> {
          user?.email || 'email@domain.com'}
          <Button
            onClick={()=> navigate("/update-profile")}
            className="btn btn-dark w-100 mt-2"
          >
            Update Profile
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button
          className="btn btn-dark mt-2"
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
        <Button className="btn btn-dark mt-2" onClick={handleLogout}>
          Log Out
        </Button>
        <br />

      </div>
    </>
  );
};

export default Profile;
