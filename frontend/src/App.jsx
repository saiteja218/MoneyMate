import { useState } from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'




function App() {
  const { user } = useSelector((state) => state.auth);

  return (

    <div style={{ backgroundColor: '#f6f4f4' }}>
      {/* <Signup /> */}
      
      <Routes>
      <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
      <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} /> 
      <Route path="/login" element={user?<Navigate to="/home"/>: <Login />} />
      <Route path="/home/*" element={!user ? <Navigate to="/login"/>:<Home />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            zIndex: 9999,
          },
        }}/>
    </div>
  )
}

export default App
