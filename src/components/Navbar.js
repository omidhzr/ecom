import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../images/logo.svg'
import { UserAuth } from '../context/AuthContext'


export const Navbar = ({ user }) => {
    const { logOut } = UserAuth();
    const navigate = useNavigate();
    // handle logout
    const Logout = async () => {
        try {
            await logOut();
            // console.log('You are logged out')
            navigate('./');
        } catch (error) {
            console.log(error.message);
        }
            
        }
    
    return (
        <div className = 'navbox'>
            <div className = 'left-side'>
                <img src={logo} alt = ''/>
            </div>
            {!user && <div className='right-side'>
                <span><Link to="signup" className='navlinks'>SIGN UP</Link></span>
                <span><Link to="login" className='navlinks'>LOGIN</Link></span>
            </div>}
            {user && <div className='right-side'>
                <span><Link to="profile" className='navlinks'>{user}</Link></span>
                <span><button className='logout-btn' onClick={Logout}>Logout</button></span>
            </div>}
            
        </div>
    )
}