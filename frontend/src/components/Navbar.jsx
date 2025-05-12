import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery, useTheme, Box,Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem('user');
        navigate('/login');
    };
    return (
        <div>
            <AppBar position="fixed" elevation={1} sx={{ zIndex: theme.zIndex.drawer + 1, background: '#ffffff', color: '#000' }} >
                <Toolbar sx={{}}>
                    {
                        isMobile && (
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}> {/* add onClick={onMenuClick} */}
                                <MenuIcon />
                            </IconButton>
                        )
                    }

                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        MoneyMate
                    </Typography>
                    <Button color="primary" variant="contained" onClick={handleLogout}>
                    Logout
                </Button>
                </Toolbar>
                
            </AppBar>
            <Box sx={{ height: { xs: '56px', sm: '64px' } }} />

        </div>
    )
}
