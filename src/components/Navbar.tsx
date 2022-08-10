import React, { useContext, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
// import From from react-bootstrap
import { Form } from 'react-bootstrap';
import { DarkModeContext } from '../context/DarkModeContext';


export const Navbar = ({ user, totalProducts }: {user: any, totalProducts: any }) => {

  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  // if darkMode is true, then set the className of the body to dark
  if (darkMode) {
    document.body.className = 'dark';
  } else {
    document.body.className = '';
  }

  return (
    <div className="navbox">
      <div className="left-side">
        <Link to="/">
        <img src={logo} alt="" />
        </Link>
      </div>
      {!user && (
        <div className="right-side">
          <span>
            {/* // show the login icon and when clicked navigate to login page */}
            <Icon icon={profileIcon} onClick={()=> navigate('/login')} size={24} />
          </span>
          <span>
            <Form>
              <Form.Check 
                type="switch"
                id="switch"
                onChange= {toggleDarkMode}
              />
            </Form>
          </span>
          <span>{}</span>

        </div>
      )}
      {user && (
        <div className="right-side">
          <span>
            <Icon onClick={handleShowProfile} icon={profileIcon} size={24}>
              {user}
            </Icon>
            {/* // when the Icon is clicked, the Profile component is rendered in the Offcanvas component */}
            <Offcanvas id='offcanvas' show={showProfile} onHide={handleCloseProfile} placement={'end'}>
              <Offcanvas.Header closeButton>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Profile />
              </Offcanvas.Body>
            </Offcanvas>
          </span>
          <span>
            <div>
              <Icon
                
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
          <span>
            <Form>
              <Form.Check 
                type="switch"
                id="switch"
                onChange={toggleDarkMode}
              />
            </Form>
          </span>
          <span className="cart-menu-btn">
            {/*   this will be the cart in the future /Omid
            <ShoppingCart
              shoow={shoow}
              handleClose={handleClose}
            ></ShoppingCart> */}

            {totalProducts >0 && <span className="cart-menu-btn  cart-indicator">
              {totalProducts}
            </span>
            }
          </span>
          {/* <span><button className='logout-btn' onClick={Logout}>Logout</button></span> */}
        </div>
      )}
    </div>
  );
};
