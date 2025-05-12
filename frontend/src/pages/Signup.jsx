import React from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import right from '../assets/right.png';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { signupUser } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';


export default function Signup() {
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '' });


  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value)

    setFormData({ ...formData, [name]: value });
    // setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData)

  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {toast.error("Full Name is required"); return;} ;
    if (!formData.email.trim()) {toast.error("Email is required"); return;} ;
    if (!/\S+@\S+\.\S+/.test(formData.email)) {toast.error("Email is invalid"); return;}
    if (!formData.password) {toast.error("Password is required"); return;}
    if (formData.password.length < 6) {toast.error("Password must be at least 6 characters"); return;};
    console.log('Form Submitted:', formData);
    try {
      const res = await dispatch(signupUser(formData)).unwrap();
      console.log('Submitted:', res);
      toast.success('Signup successful!');
      //dispathch

    } catch (error) {
      toast.error("Error in signup")
    }

  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
   
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: isMobile ? 'column' : 'row' ,backgroundColor: '#f6f4f4'}}>


      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Box sx={{ width: isMobile ? '100%' : '75%', maxWidth: 500 }}>
          <Typography component="h1" variant="h5" fontWeight="bold" mb={2} textAlign="center">
            Make Every Rupee Count with <span style={{ color: '#1976d2' }}>MoneyMate</span>.
          </Typography>
          <Card sx={{ borderRadius: '15px' }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }} />

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
                    Sign Up
                  </button>
                </Box>
              </form>
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                 Already Have an Account{' '}
                <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
                  Login here
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>


      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', p: 2 }}>
        <Box component="img" src={right} alt="Signup" sx={{ width: '90%', maxHeight: '100%', objectFit: 'contain' }} />
      </Box>
    </Box>
   
  );
}
