/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
// import { UserAuth } from '../context/AuthContext'
import { Icon } from 'react-icons-kit';
// import {user as profileIcon} from 'react-icons-kit/typicons/user'
// import { user as profileIcon } from 'react-icons-kit/feather/user';
import {ic_person as profileIcon} from 'react-icons-kit/md/ic_person'
import { shoppingCart } from 'react-icons-kit/typicons/shoppingCart';
import {ic_shopping_cart_outline} from 'react-icons-kit/md/ic_shopping_cart_outline'
// import { ShoppingCart } from './ShoppingCart'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
// import From from react-bootstrap
import { Form } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/config';
import {onSnapshot,collection} from 'firebase/firestore';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export const Navbar = ({ switchTheme }: { switchTheme: any }) => {

  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);
  const [totalProducts, setTotalProducts] = useState<number>();
  const {user} = UserAuth();
  const navigate = useNavigate();

  const [isDarkMode, setDarkMode] =  useState<boolean>(
    localStorage.getItem('dark-mode') === 'true'
  );

//get number of items (quantity) in users cart
  function GetNumberOfCartItems () {
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(collection(db, 'Cart ' + user.uid), (snapshot) => {
            let total = 0;
            snapshot.forEach((doc) => {
              total += doc.data().qty;
            });
            setTotalProducts(total);
          });
        }
      });
    }, []);
  }
  GetNumberOfCartItems();
  // console.log('totalProducts: ' + totalProducts);

  const [dark, setDark] = useState<boolean>(
    localStorage.getItem('dark-mode') === 'true'
  );
  useEffect(() => {
    localStorage.setItem('dark-mode', dark);
    // if dark-mode is true, add dark class to body
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [dark]);

  const toggleTheme = (checked: boolean) => {
    setDark(!dark);
    setDarkMode(checked);
  };

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
            {/*  show the login icon and when clicked navigate to login page */}
            <Icon icon={profileIcon} onClick={()=> navigate('/login')} size={24} />
          </span>
          <span>
            {/* <Form>
              <Form.Check 
                type="switch"
                id="switch"
                onChange={switchTheme}
              />
            </Form> */}
            <DarkModeSwitch
              style={{ marginBottom: '2rem' }}
              checked={isDarkMode}
              onChange={toggleTheme}
              size={24}
            />
          </span>
          <span>{}</span>

        </div>
      )}
      {user && (
        <div className="right-side">
          <span>
            <Icon onClick={handleShowProfile} icon={profileIcon} size={24}>
              {user.displayName}
            </Icon>
            {/* when the Icon is clicked, the Profile component is rendered in the Offcanvas component */}
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
                icon={ic_shopping_cart_outline}
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
            {/* <Form>
              <Form.Check 
                type="switch"
                id="switch"
                onChange={switchTheme}
              />
            </Form> */}
            <DarkModeSwitch
              style={{ marginBottom: '2rem' }}
              checked={isDarkMode}
              onChange={toggleTheme}
              size={24}
            />
            {/*  add lightswitch-off.png image from images folder when themeSwitch is light or lightswitch-on.png if dark 
             and use it as a switch button on click switchTheme function is called */}
            {/* <img src={themeSwitch === 'light' ? 'images/lightswitch-on.png' : 'images/lightswitch-off.png'} alt="" onClick={switchTheme} /> */}
          
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
