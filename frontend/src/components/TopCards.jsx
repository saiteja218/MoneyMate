import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, useTheme, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SavingsIcon from '@mui/icons-material/Savings';
import ThemeToggle from './ThemeToggle'; 

export default function TopCards({ income, expense }) {
  const theme = useTheme();
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    setSavings(income - expense);
  }, [income, expense]);

  const cardBg = theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5';
  const textColor = theme.palette.text.primary;

  const cardStyle = {
     padding: 2,
        borderRadius: 2,
        backgroundColor: cardBg,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: { xs: '90%', sm: '90%', md: '80%' },  
        margin: 'auto', 
  };

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pr: 4 }}>
        <ThemeToggle />
      </Box>
    <Grid container spacing={2} sx={{ padding: 1, justifyContent: 'space-evenly' }}>
      <Grid size={{ xs: 12, sm: 4 }} >
        <Paper elevation={3} sx={cardStyle}>
          <AttachMoneyIcon color="primary" sx={{ fontSize: 40, }} />
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              Total Income
            </Typography>
            <Typography variant="h6">₹{income}</Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }} >
        <Paper elevation={3} sx={cardStyle}>
          <MoneyOffIcon color="error" sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              Total Expense
            </Typography>
            <Typography variant="h6">₹{expense}</Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }} >
        <Paper elevation={3} sx={cardStyle}>
          <SavingsIcon color="success" sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              Net Savings
            </Typography>
            <Typography variant="h6">₹{savings}</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
}
