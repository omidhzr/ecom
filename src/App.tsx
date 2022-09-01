import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import AddProducts from "./components/AddProducts";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import { Navbar } from "./components/Navbar";


export interface ApplicationProps {}

const App: React.FunctionComponent<ApplicationProps> = (props) => {

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
    // make the body class dark or light
    document.body.classList.remove(theme === 'light' ? 'dark' : 'light');
    document.body.classList.add(theme);

  }, [theme]);

  
  return (
    
    <AuthContextProvider>
      <Navbar switchTheme={toggleTheme} />
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
    </AuthContextProvider>
    
  );
}

export default App;
