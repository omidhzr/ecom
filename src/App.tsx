import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
// import Profile from "./components/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
// import AddProducts from "./components/AddProducts";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import { Navbar } from "./components/Navbar";
import { Contact } from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/config";
import { useAppDispatch } from "./redux/store";
import { logOut } from "./redux/features/auth/authService";
import { setUser } from "./redux/features/auth/authSlice";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApplicationProps { }

const App: React.FunctionComponent<ApplicationProps> = () => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // The user logged in / was logged in
        dispatch(setUser(userAuth));
      } else {
        // The user logged out
        dispatch(logOut());
      }
    });
  }, [dispatch]);

  return (

    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
        <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        {/* <Route path="/add-products" element={<ProtectedRoute><AddProducts /></ProtectedRoute>} /> */}
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </AuthContextProvider>

  );
}

export default App;
