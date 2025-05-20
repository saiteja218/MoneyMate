import React from 'react';
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';


export default function TopBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#192b45', px: 2, py: 1, color: 'white' }}>
      <Box fontWeight="bold" fontSize="20px">MoneyMate</Box>
      <IconButton onClick={handleMenu} sx={{ color: 'white' }}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose()}>
        <MenuItem onClick={() => handleClose('/home')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </MenuItem>
        <MenuItem onClick={() => handleClose('/home/income')}>
          <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
          <ListItemText primary="Income" />
        </MenuItem>
        <MenuItem onClick={() => handleClose('/home/expense')}>
          <ListItemIcon><MoneyOffIcon /></ListItemIcon>
          <ListItemText primary="Expense" />
        </MenuItem>
        <MenuItem onClick={() => handleClose('/home/insights')}>
          <ListItemIcon><SmartToyIcon /></ListItemIcon>
          <ListItemText primary="AI Insights" />
        </MenuItem>
        <MenuItem onClick={() => handleClose('/home/SavingsGoal')}>
          <ListItemIcon><SmartToyIcon /></ListItemIcon>
          <ListItemText primary="Savings Goal" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Box>
  );
}
