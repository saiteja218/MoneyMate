import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CssBaseline } from '@mui/material'; 
import { useMemo } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const user = useSelector((state) => state.auth?.user);
const isOtpVerified = useSelector((state) => state.auth?.isOtpVerified);

  const isAuthenticated = user && isOtpVerified;
  console.log("User:", user);
console.log("OTP Verified:", isOtpVerified);


  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home/*" element={!isAuthenticated ? <Navigate to="/login" /> : <Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { zIndex: 9999 },
        }}
      />
    </>
  );
}

export default App;
