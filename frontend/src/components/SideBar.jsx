import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import '../styles/Sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SavingsIcon from '@mui/icons-material/Savings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Typography } from '@mui/material';
import ThemeToggle from './ThemeToggle';


export default function Sidebar() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setName(user.name);
        }
    }, []);

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem('user');
        navigate('/login');
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const ColorButton = styled(ListItemButton, {
        shouldForwardProp: (prop) => prop !== 'selected',
    })(({ selected }) => ({
        color: "white",
        backgroundColor: selected ? "#3da683" : "#192b45",
        '&:hover': {
            backgroundColor: "#3da683",
        },
        borderRadius: "10px",
        margin: "14px 0",
        fontWeight: selected ? 600 : 400,
        boxShadow: selected ? "0 0 6px rgba(61, 166, 131, 0.6)" : "none",
    }));


    return (
        <div className={"sidebar"}>
            {/* <div className={sidebar ${isMobile ? 'topbar' : ''}}> */}

            <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',flexDirection:"column" }}>
                <div>
                    <h1 className="app-name">MoneyMate</h1>
                    <h6 className="welcome-text">Welcome, <span className="user-name">{name}</span></h6>
                </div>
                {/* <ThemeToggle /> */}
            </div>



            <List className="sidebar-menu">
                <ColorButton component={Link} to="/home" className="sidebar-item-pill" selected={location.pathname === '/home'} >
                    <ListItemIcon sx={{ color: "white" }}><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ColorButton >

                <ColorButton component={Link} to="/home/income" className="sidebar-item-pill" selected={location.pathname === '/home/income'}>
                    <ListItemIcon sx={{ color: "white" }}><AttachMoneyIcon /></ListItemIcon>
                    <ListItemText primary="Income" />
                </ColorButton>

                <ColorButton component={Link} to="/home/expense" className="sidebar-item-pill" selected={location.pathname === '/home/expense'}>
                    <ListItemIcon sx={{ color: "white" }}><MoneyOffIcon /></ListItemIcon>
                    <ListItemText primary="Expense" />
                </ColorButton>

                <ColorButton component={Link} to="/home/insights" className="sidebar-item-pill" selected={location.pathname === '/home/insights'}>
                    <ListItemIcon sx={{ color: "white" }}><SmartToyIcon /></ListItemIcon>
                    <ListItemText primary="AI Insights" />
                </ColorButton>

                <ColorButton component={Link} to="/home/savingsGoals" className="sidebar-item-pill" selected={location.pathname === '/home/savingsGoals'}>
                    <ListItemIcon sx={{ color: "white" }}><SavingsIcon /></ListItemIcon>
                    <ListItemText primary="Savings Goals" />
                </ColorButton>
            </List>
            

            <div className="logout-wrapper">
                <ListItemButton className="sidebar-item-pill"
                    sx={{
                        color: "white",
                        backgroundColor: '#d32f2f',
                        '&:hover': {
                            backgroundColor: '#9a0007',
                        },


                    }}

                    onClick={handleLogout}>
                    <ListItemIcon sx={{ color: "white" }}><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </div>

        </div>
    );
}