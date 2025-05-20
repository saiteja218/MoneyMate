import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIncome, addIncome, getExpense, addExpense, deleteExpense } from '../store/slices/transactionSlice.js';
import formatDate from '../utils/formatDate.js';
import { Paper, Typography, List, ListItem, ListItemText, Box, Pagination, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import CloseIcon from '@mui/icons-material/Close';
import TopCards from './TopCards';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Expense() {
    const [income, setIncome] = useState(0);
    // const [expense, setExpense] = useState(0);
    const [allIncome, setAllIncome] = useState([]); 
    const [allExpense, setAllExpense] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;
    const [open, setOpen] = useState(false);
    const [newExpense, setNewExpense] = useState({
        category: "",
        amount: 0,
        date: null
    })
    const dispatch = useDispatch();
const expense = allExpense.reduce((acc, item) => acc + item.amount, 0);

    useEffect(() => {
        const fetchData = async () => {
            const incomeRes = await dispatch(getIncome());
            const expenseRes = await dispatch(getExpense());

            if (incomeRes.meta.requestStatus === 'fulfilled') {
                const totalIncome = incomeRes.payload.reduce(
                    (acc, item) => acc + item.amount, 0);
                setIncome(totalIncome);
                setAllIncome(incomeRes.payload);
            }
            if (expenseRes.meta.requestStatus === 'fulfilled') {
                const totalExpense = expenseRes.payload.reduce(
                    (acc, item) => acc + item.amount, 0);
                // setExpense(totalExpense);
                setAllExpense(expenseRes.payload);
            }
        };
        fetchData();
    }, [dispatch]);

    const allTransactions = [...allExpense].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const totalTransactions = allTransactions.length;
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const currentTransactions = allTransactions.slice(startIndex, endIndex);
    // console.log(totalPages)



    const groupedData = allExpense.reduce((acc, transaction) => {
        const date = formatDate(transaction.date);
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
    }, {})

    const lineChartData = Object.entries(groupedData).map(([date, amount]) => ({
        date,
        expense: amount
    }));

    const handleAddExpense = async () => {
        const res = await dispatch(addExpense(newExpense));
        if (res.meta.requestStatus === 'fulfilled') {
            setAllExpense((prev) => [...prev, res.payload]);
            setNewExpense({
                category: "",
                // source: "",
                amount: 0,
                date: "",
            })
            setOpen(false);

        }
    }
    const handleDelete = async (id) => {
        const res = await dispatch(deleteExpense(id));
        if (res.meta.requestStatus === "fulfilled") {
            setAllExpense((prev) => prev.filter((item) => item._id !== id));
        }
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <>
            <TopCards income={income} expense={expense} />
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Add New Expense
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="category"
                        sx={{ mt: 2 }}
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        sx={{ mt: 2 }}
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                        fullWidth
                    />
                    <TextField
                        // label="Date"
                        type="date"
                        sx={{ mt: 2 }}
                        // InputLabelProps={{ shrink: true }}
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={handleAddExpense} variant="contained" color="primary">
                            Add
                        </Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>

            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-evenly', flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "center" : "", gap: 2, }}>
                <Box sx={{ width: { xs: '100%', md: '50%' }, m: !isMobile ? 3 : 0, mr: !isMobile ? 1.5 : 0, }} size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 1, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Recent Expense Transactions
                            <button style={{
                                float: 'right', padding: "3px 8px", backgroundColor: "#1876d3", color: "white", borderRadius: "5px", fontWeight: "600", margin: "5px", border: "none"
                            }}
                                onClick={() => { setOpen(true) }}>Add Expense</button>
                        </Typography>
                        <Box sx={{ flexGrow: 1, overFlowY: 'auto' }}>
                            <List>
                                {currentTransactions.map((transaction, index) => (
                                    <ListItem key={index}
                                        sx={{
                                            '&:hover .delete-icon': { opacity: 1 },
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>

                                        <MoneyOffIcon color="error" sx={{ mr: 5 }} />

                                        <ListItemText
                                            primary={`${transaction.source || transaction.category} - ₹${transaction.amount}`}
                                            secondary={formatDate(transaction.date)}
                                        />
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            className="delete-icon"
                                            onClick={() => handleDelete(transaction._id)}
                                            sx={{ opacity: 0, transition: 'opacity 0.3s', mr: 2 }}
                                        >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box>
                            <Pagination sx={{ mt: 2, display: 'flex', justifyContent: 'center', p: 1 }}
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

                <Box sx={{ width: { xs: '100%', md: '50%' }, m: !isMobile ? 3 : 1, ml: !isMobile ? 1.5 : 0 }} size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 1, borderRadius: 2, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Expense Over Time
                        </Typography>
                            <LineChart 
                            xAxis={[{ scaleType: 'band', data: lineChartData.map((d) => (d.date)) }]}
                            series={[
                                {
                                    data: lineChartData.map((d) => (d.expense)),
                                    label: "line",
                                    color: "#3eaa85"
                                }
                            ]}
                            height={400}
                            margin={{ top: 20, bottom: 50, left: 40, right: 10 }}
                                
                            />
                    </Paper>
                </Box>
            </Box>
        </>
    );
}
