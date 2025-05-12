import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIncome, getExpense } from '../store/slices/transactionSlice';
import formatDate from '../utils/formatDate.js';
import { Grid, Paper, Typography, List, ListItem, ListItemText, Box, Pagination, } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import TopCards from './TopCards.jsx';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

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
    { name: 'Income', value: income },
    { name: 'Expense', value: expense },
    { name: 'Savings', value: savings },
  ];
  const COLORS = ['#3eaa85', '#182d44', '#fcbf4c'];

  return (
    <>
      <TopCards income={income} expense={expense} />
      <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', flexWrap: "wrap", gap: 2 }}>

        <Box sx={{ width: { xs: '100%', md: '48%' }, }}>
          <Paper sx={{ p: 1, borderRadius: 2, height: '100%', flex: '1 1 48%', }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <List>
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
          
            <Box>
              <Pagination sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
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

        <Box sx={{ width: { xs: '100%', md: '50%' }, }}>
          <Paper sx={{ p: 1, borderRadius: 2, height: '100%', flex: '1 1 48%', minWidth: "300px" }}>
            <Typography variant="h6" gutterBottom>
              Financial Overview
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
