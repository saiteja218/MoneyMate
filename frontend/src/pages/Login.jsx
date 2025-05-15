import React from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import right from '../assets/right.png';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import '../styles/login.css'

export default function Login() {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.fullName.trim()) {alert("Full Name is required"); return;} ;
    if (!formData.email.trim()) return toast.error('Email is required')
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Email is invalid')
      if (!formData.password) return toast.error('Password is required')
      if (formData.password.length < 6) return toast.error('Password must be at least 6 characters')
    
    try {
      

      const res = await dispatch(loginUser(formData)).unwrap();
      console.log('Submitted:', res);
      toast.success(res.message)
      //dispathch

    } catch (error) {
      // console.error('Error:', error);
      const errorMsg = typeof error === 'string' ? error : 'Login failed';
    toast.error(errorMsg);
      // Handle error (e.g., show a toast notification)
    }
  }


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: isMobile ? 'column' : 'row',backgroundColor: '#f6f4f4' ,flex: 1}}>


      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Box sx={{ width: isMobile ? '100%' : '75%', maxWidth: 500 }}>
          
          <Card sx={{ borderRadius: '15px' }}>
            <Typography component="h1" variant="h5" fontWeight="bold" m={2} mb={1} textAlign="center">
            Make Every Rupee Count with <span style={{ color: '#41aa84' }}>MoneyMate</span>.
          </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }} />

                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }} />

                  <button
                    type="submit"
                    style={{
                      padding: '12px',
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      fontSize: '16px',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#125ca1')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#1976d2')}
                  >
                    Login
                  </button>
                </Box>
              </form>
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Already have an account?{' '}
                <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }} onClick={() => navigate('/signup')}>
                  Signup here
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>


      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', p: 2 }}>
        <Box component="img" src={right} alt="Signup" sx={{ width: '80%', maxHeight: '100%', objectFit: 'contain' }} />
      </Box>
    </Box>
  );
}
