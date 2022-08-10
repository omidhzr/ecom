import React, { useContext, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';

const Profile = () => {
  const [error, setError] = useState('');
  const { user, logOut, removeUser } = UserAuth();
  // const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  if (darkMode) {
    // make the root dark
    document.body.className = "dark";
  } else {
    document.body.className = "";
  }

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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <strong>Name:</strong> {// @ts-ignore
          user!.displayName}
          <br />

          <strong>Email:</strong> {// @ts-ignore
          user!.email}
          <Link
            to="/update-profile"
            className="btn btn-outline-dark w-100 mt-2"
          >
            Update Profile
          </Link>
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
