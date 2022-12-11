/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { Icon } from 'react-icons-kit';
import { ic_person as profileIcon } from 'react-icons-kit/md/ic_person'
import { ic_shopping_cart_outline } from 'react-icons-kit/md/ic_shopping_cart_outline'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchCart } from '../redux/features/cart/cartService';


export const Navbar = () => {

  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  // for switch checked property
  const [isDarkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('dark-mode') === 'true'
  );

  const [dark, setDark] = useState<boolean>(
    localStorage.getItem('dark-mode') === 'true'
  );
  useEffect(() => {
    localStorage.setItem('dark-mode', dark.toString());
    // localStorage.setItem('dark-mode', dark);
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

  const user = useAppSelector((state) => state.authReducer.user);

  //get the user email from redux store
  const userEmail = useAppSelector((state) => state.authReducer.user?.email);
  // console.log('userEmail: ' + userEmail);
  // get the cart products from redux store cartReducer
  useEffect(() => {
    if (userEmail !== null && userEmail !== undefined && userEmail !== '') {
      dispatch(fetchCart(userEmail));
    }
  }, [dispatch, userEmail]);

  // get the cart products from redux store cartReducer
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  // console.log(cartItems.length);


  return (
    <div className="navbox">
      <div className="left-side">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      {user === null && (
        <div className="right-side">
          <span>
            <Icon icon={profileIcon} onClick={() => navigate('/login')} size={24} />
          </span>
          <span>
            <DarkModeSwitch
              style={{ marginBottom: '2rem' }}
              checked={isDarkMode}
              onChange={toggleTheme}
              size={24}
            />
          </span>
        </div>
      )}
      {user && (
        <div className="right-side">
          <span>
            <Icon onClick={handleShowProfile} icon={profileIcon} size={24} />
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
          </span>
          <span>
            <DarkModeSwitch
              style={{ marginBottom: '2rem' }}
              checked={isDarkMode}
              onChange={toggleTheme}
              size={24}
            />
          </span>
          <span className="cart-menu-btn">
            {cartItems.length > 0 && cartItems.length !== undefined && (
              <span className="cart-indicator">{cartItems.length}</span>
            )}
          </span>
        </div>
      )
      }
    </div >
  );
};


