import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
// import { UserAuth } from '../context/AuthContext'
import { Icon } from 'react-icons-kit';
// import {user as profileIcon} from 'react-icons-kit/typicons/user'
import { user as profileIcon } from 'react-icons-kit/feather/user';
import { shoppingCart } from 'react-icons-kit/typicons/shoppingCart';
// import { ShoppingCart } from './ShoppingCart'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Profile from './Profile';

export const Navbar = ({ user, totalProducts }: {user: any, totalProducts: any }) => {
  // const { logOut } = UserAuth();
  // const navigate = useNavigate();
  // handle logout
  // const Logout = async () => {
  //     try {
  //         await logOut();
  //         // console.log('You are logged out')
  //         navigate('./');
  //     } catch (error) {
  //         console.log(error.message);
  //     }

  //     }
  // const [shoow, setShow] = useState(false)
  const [showProfile, setShowProfile] = useState(false);
  // const handleShow = () => setShow(true)
  const handleShowProfile = () => setShowProfile(true);
  // const handleClose = () => setShow(false)
  const handleCloseProfile = () => setShowProfile(false);

  return (
    <div className="navbox">
      <div className="left-side">
        <img src={logo} alt="" />
      </div>
      {!user && (
        <div className="right-side">
          <span>
            <Link to="signup" className="navlinks">
              SIGN UP
            </Link>
          </span>
          <span>
            <Link to="login" className="navlinks">
              LOGIN
            </Link>
          </span>
        </div>
      )}
      {user && (
        <div className="right-side">
          <span>
            <Icon onClick={handleShowProfile} icon={profileIcon} size={24}>
              {user}
            </Icon>
            <Offcanvas
              placement={'end'}
              show={showProfile}
              onHide={handleCloseProfile}
              responsive="lg"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Profile></Profile>
              </Offcanvas.Body>
            </Offcanvas>
          </span>
          <span>
            <div>
              <Icon
                className="navlinks"
                icon={shoppingCart}
                size={24}
                onClick={() => {
                  window.location.href = '/cart';
                }}
              />
            </div>
            {/* <Icon
              icon={shoppingCart}
              className="navlinks"
              size={24}
              onClick={handleShow}
            ></Icon> */}
          </span>
          <span className="cart-menu-btn">
            {/*   this will be the cart in the future /Omid
            <ShoppingCart
              shoow={shoow}
              handleClose={handleClose}
            ></ShoppingCart> */}

            <span className="cart-menu-btn  cart-indicator">
              {totalProducts}
            </span>
          </span>
          {/* <span><button className='logout-btn' onClick={Logout}>Logout</button></span> */}
        </div>
      )}
    </div>
  );
};
