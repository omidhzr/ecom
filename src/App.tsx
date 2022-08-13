import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import AddProducts from "./components/AddProducts";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import { Navbar } from "./components/Navbar";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from './config/config';
import {onSnapshot,collection} from 'firebase/firestore';

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {

  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [userr, setUser] = useState<User | null>(null);
  const { user } = UserAuth();
  
  // getting number of items in users cart
  function GetNumberOfCartItems () {
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          onSnapshot(collection(db, 'Cart ' + currentUser.uid), (snapshot) => {
            // console.log(snapshot);
            const qty = snapshot.docs.length;
            setUser(currentUser);
            setTotalProducts(qty);
            // console.log(currentUser);
          });
        }
      });
    }, []);
  }
  GetNumberOfCartItems();

  const [theme, setTheme] = useState<string>('light');
  localStorage.setItem('theme', 'light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };
  useEffect(() => {
    // document.documentElement.setAttribute("data-theme", theme);
    // make the body class dark or light
    document.body.classList.remove(theme === 'light' ? 'dark' : 'light');
    document.body.classList.add(theme);

  }, [theme, user]);

  
  return (
    
    <AuthContextProvider>
      {/* <div className='App' data-theme={theme} > */}
      <Navbar totalProducts={totalProducts} switchTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}/> 
        <Route path="/add-products" element={<ProtectedRoute><AddProducts /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* </div> */}
    </AuthContextProvider>
    
  );
}

export default App;
