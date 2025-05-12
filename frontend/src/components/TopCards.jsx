import React, { useEffect } from 'react';
import '../styles/topcard.css'
import { Paper, Typography, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getIncome } from '../store/slices/transactionSlice';
import { getExpense } from '../store/slices/transactionSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function TopCards({income, expense}) {
  // const [Income, setIncome] = useState(0);
  // const [Expense, setExpense] = useState(0);
  const [savings, setSavings] = useState(0);
  // const dispatch = useDispatch();
  // const {income} = useSelector((state) => state.transaction);
  // const {expense} = useSelector((state) => state.transaction);
  
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const incomeRes = await dispatch(getIncome());
  //       const expenseRes = await dispatch(getExpense());
  
  //       if (incomeRes.meta.requestStatus === 'fulfilled') {
  //         const totalIncome = incomeRes.payload.reduce((acc, item) => acc + item.amount, 0);
  //         setIncome(totalIncome);
  //       }
  
  //       if (expenseRes.meta.requestStatus === 'fulfilled') {
  //         const totalExpense = expenseRes.payload.reduce((acc, item) => acc + item.amount, 0);
  //         setExpense(totalExpense);

  //       }
  //     };
  
  //     fetchData();
      
  //   }, [dispatch]);
    useEffect(() => {
      const totalSavings = income - expense;
      setSavings(totalSavings);
    }, [income, expense]);
    
  return (
    <Grid container spacing={2} sx={{ padding: 1, display:"flex",justifyContent:"space-evenly" }} >
      
      <Grid span={12} size={{ xs: 12, sm: 4 }} >
        <Paper elevation={3} sx={{ padding: 1, borderRadius: 2, backgroundColor: '#f5f5f5', pr:"7rem"}}>
          <Typography variant="p" sx={{ fontWeight: 500 }}>Total Income</Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', marginTop: 1, }}>₹{income}</Typography>
        </Paper>
      </Grid>

      <Grid span={12} size={{ xs: 12, sm: 4 }}>
        <Paper elevation={3} sx={{ padding: 1, borderRadius: 2, backgroundColor: '#f5f5f5', pr:"7rem" }}>
          <Typography variant="p" sx={{ fontWeight: 500 }}>Total Expense</Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', marginTop: 1 }}>₹{expense}</Typography>
        </Paper>
      </Grid>

      <Grid span={12} size={{ xs: 12, sm: 4 }}>
        <Paper elevation={3} sx={{ padding: 1, borderRadius: 2, backgroundColor: '#f5f5f5', pr:"7rem"}}>
          <Typography variant="p" sx={{ fontWeight: 500 }}>Net Savings</Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', marginTop: 1 }}>₹{savings}</Typography>
        </Paper>
      </Grid>

    </Grid>
  );
}
