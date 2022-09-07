import React from "react";
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


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApplicationProps { }

const App: React.FunctionComponent<ApplicationProps> = () => {

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
