import React, { useEffect ,useState} from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

import '../styles/Sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { List } from '@mui/material';
import { useSelector } from 'react-redux';



export default function Sidebar() {
    const [name, setName] = useState('');
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            setName(user.name);
            // console.log(name)
        }

    },[])
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">
                <span className="greeting">Welcome, </span>
                <span className="user-name">{name }</span>
            </h2>
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <Link to="/home" className="sidebar-link">
                        <span className="icon"><ListItemIcon><DashboardIcon /></ListItemIcon></span>
                        Dashboard
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/home/income" className="sidebar-link">
                        <span className="icon"><ListItemIcon><AttachMoneyIcon /></ListItemIcon></span>
                        Income
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/home/expense" className="sidebar-link">
                        <span className="icon"><ListItemIcon><MoneyOffIcon /></ListItemIcon></span>
                        Expense
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/home/insights" className="sidebar-link">
                        <span className="icon"><ListItemIcon><SmartToyIcon /></ListItemIcon></span>
                        AI Insights
                    </Link>
                </li>
            </ul>   
        </div>
    );
}
