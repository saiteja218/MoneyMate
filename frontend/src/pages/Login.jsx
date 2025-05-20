import React from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import right from '../assets/right-1.png';
import { useDispatch } from 'react-redux';
import { loginUser, verifyOtp } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import '../styles/login.css'


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [isOtpStage, setIsOtpStage] = React.useState(false);
  const [otp, setOtp] = React.useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    if (!isOtpStage) {
      e.preventDefault();
      // if (!formData.fullName.trim()) {alert("Full Name is required"); return;} ;
      if (!formData.email.trim()) return toast.error('Email is required')
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Email is invalid')
      if (!formData.password) return toast.error('Password is required')
      if (formData.password.length < 6) return toast.error('Password must be at least 6 characters')

      try {


        const res = await dispatch(loginUser(formData)).unwrap();
        toast.success(res.message || 'OTP sent!');
        setIsOtpStage(true);
        //dispathch

      } catch (error) {
        // console.error('Error:', error);
        const errorMsg = typeof error === 'string' ? error : 'Login failed';
        toast.error(errorMsg);
        // Handle error (e.g., show a toast notification)
      }
    } else {
      e.preventDefault();
      try {
        if (!otp.trim()) return toast.error('OTP is required');

        const response = await dispatch(verifyOtp({ email: formData.email, otp })).unwrap();
        console.log(response)
        if(response.success){
          toast.success('Login successful!');
        navigate('/home');
        }
        
      } catch (error) {
        const errorMsg = typeof error === 'string' ? error : 'OTP verification failed';
        toast.error(errorMsg);
      }
    }
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const cardBg = theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5';
  const textColor = theme.palette.text.primary;
  return (

    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: isMobile ? 'column' : 'row', backgroundColor: cardBg, flex: 1 }}>


      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Box sx={{ width: isMobile ? '100%' : '75%', maxWidth: 500 }}>

          <Card sx={{ borderRadius: '15px' }}>
            <Typography component="h1" variant="h5" fontWeight="bold" m={2} mb={1} textAlign="center">
              Make Every Rupee Count with <span style={{ color: '#41aa84' }}>MoneyMate</span>.
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {(!isOtpStage) ? (
                    <>
                      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }} />

                      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }} />
                    </>
                  ) : (
                    <>
                      <Typography textAlign="center" fontWeight="bold">Enter the OTP sent to your email</Typography>
                      <TextField
                        label="OTP"
                        variant="outlined"
                        fullWidth
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </>
                  )
                  }
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      fontSize: '16px',
                      borderRadius: '8px',
                      padding: '12px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#125ca1',
                      },
                    }}
                  >
                    {isOtpStage ? 'Verify OTP' : 'Login'}
                  </Button>

                </Box>
              </form>
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }} onClick={() => navigate('/signup')}>
                  Signup here
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>


      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: cardBg, p: 2 }}>
        <Box component="img" src={right} alt="Signup" sx={{ width: '80%', maxHeight: '100%', objectFit: 'contain' }} />
      </Box>
    </Box>
  );
}
