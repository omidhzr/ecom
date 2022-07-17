import React, { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import {Home} from './components/Home'
import {Signup} from './components/Signup'
import {Login} from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import Profile from './components/Profile'
import UpdateProfile from './components/UpdateProfile'
import ProtectedRoute from './components/ProtectedRoute'
import {AuthContextProvider} from './context/AuthContext'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './config/Config'


function App() {
const [user, setUser] = useState({});

useEffect(() => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser({displayName: currentUser?.displayName})
}, []);
})
    return (
      <AuthContextProvider>
        <Routes>
          <Route exact path = '/' element = {<Home user={user.displayName}/>} />
          <Route path= '/signup' element= {<Signup/>} />
          <Route path= '/login' element= {<Login/>} />
          <Route path= '/forgot-password' element= {<ForgotPassword/>} />
          <Route path= '/profile' element= { <ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path= '/update-profile' element= {<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
        </Routes>
        </AuthContextProvider>
    )
  }

export default App;