import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIncome, getExpense } from '../store/slices/transactionSlice';
import formatDate from '../utils/formatDate.js';
import { Grid, Paper, Typography, List, ListItem, ListItemText, Box, Pagination, useTheme, useMediaQuery } from '@mui/material';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import TopCards from './TopCards.jsx';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { PieChart } from '@mui/x-charts/PieChart';

export default function ExpenditureOverview() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [savings, setSavings] = useState(0);
  const [allIncome, setAllIncome] = useState([]);
  const [allExpense, setAllExpense] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const incomeRes = await dispatch(getIncome());
      const expenseRes = await dispatch(getExpense());

      if (incomeRes.meta.requestStatus === 'fulfilled') {
        const totalIncome = incomeRes.payload.reduce(
          (acc, item) => acc + item.amount,
          0
        );
        setIncome(totalIncome);
        setAllIncome(incomeRes.payload);
      }
      if (expenseRes.meta.requestStatus === 'fulfilled') {
        const totalExpense = expenseRes.payload.reduce(
          (acc, item) => acc + item.amount,
          0
        );
        setExpense(totalExpense);
        setAllExpense(expenseRes.payload);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setSavings(income - expense);
  }, [income, expense]);

  const allTransactions = [...allIncome, ...allExpense].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalTransactions = allTransactions.length;
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = allTransactions.slice(startIndex, endIndex);
  // console.log(totalPages)

  const chartData = [
    { id: 0, value: income, label: 'Income', color: '#40ad86' },
    { id: 1, value: expense, label: 'Expense', color: '#192b45' },
    { id: 2, value: savings, label: 'Savings', color: '#febf4e' },
  ];
  // const COLORS = ['#3eaa85', '#182d44', '#fcbf4c'];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div >
      <TopCards income={income} expense={expense} />
      <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-evenly', flexDirection: isMobile ? "column" : "row",alignItems: isMobile ? "center" : "",gap:2, }}>

        <Box sx={{ width: { xs: '100%', md: '50%' }, m:!isMobile?3:0, mr: !isMobile ? 1.5 : 0, }} size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 1, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <List >
                {currentTransactions.map((transaction, index) => (
                  <ListItem key={index}>
                    {transaction.source ? (
                      <AttachMoneyIcon color="success" sx={{ mr: 5 }} />
                    ) : (
                      <MoneyOffIcon color="error" sx={{ mr: 5 }} />
                    )}
                    <ListItemText
                      primary={`${transaction.source || transaction.category} - ₹${transaction.amount}`}
                      secondary={formatDate(transaction.date)}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <Pagination sx={{ mt: "auto", display: 'flex', justifyContent: 'center',p:1 }}
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => {
                  setCurrentPage(value);
                }}
                size="small"
                color="primary" >
              </Pagination>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ width: { xs: '100%', md: '50%' }, m:!isMobile?3:1, ml: !isMobile ? 1.5 : 0 }} size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 1, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Financial Overview
            </Typography>
            <Box sx={{ height: 400 }}>
              <PieChart
                series={[
                  {
                    data: chartData,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    valueFormatter: ({ value }) => `₹${value}`,
                    // colors: ['#40ad86', '#192b45', '#febf4e'],
                  },
                ]}
                height={350}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 8,
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>

      </Box>
    </div>
  );
}
