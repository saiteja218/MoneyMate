import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIncome, addIncome, getExpense, deleteIncome } from '../store/slices/transactionSlice.js';
import formatDate from '../utils/formatDate.js';
import { Paper, Typography, List, ListItem, ListItemText, Box, Pagination, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import CloseIcon from '@mui/icons-material/Close';
import TopCards from './TopCards';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Income() {
    const [income, setIncome] = useState(0);
    const [incomeProp, setIncomeProp] = useState(0);
    const [expense, setExpense] = useState(0);
    const [allIncome, setAllIncome] = useState([]);
    const [allExpense, setAllExpense] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;
    const [open, setOpen] = useState(false);
    const [newIncome, setNewIncome] = useState({
        source: "",
        amount: 0,
        date: null
    })
    const dispatch = useDispatch();

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
                setExpense(totalExpense);
                // setAllExpense(expenseRes.payload);
            }
        };
        fetchData();
    }, [dispatch]);

    // useEffect(() => {
    //     setSavings(income - expense);
    // }, [income]);

    const allTransactions = [...allIncome].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const totalTransactions = allTransactions.length;
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const currentTransactions = allTransactions.slice(startIndex, endIndex);
    // console.log(totalPages)



    const groupedData = allIncome.reduce((acc, transaction) => {
        const date = formatDate(transaction.date);
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
    }, {})
    // console.log(groupedData);

    const barChartData = Object.entries(groupedData).map(([date, amount]) => ({
        date,
        income: amount
    }))
    // console.log(barChartData)

    const handleAddIncome = async () => {
        const res = await dispatch(addIncome(newIncome));
        if (res.meta.requestStatus === 'fulfilled') {
            setAllIncome((prev) => [...prev, res.payload]);
            setNewIncome({
                source: "",
                amount: 0,
                date: "",
            })
            setOpen(false);

        }
    }

    const handleDelete = async (id) => {
        const res = await dispatch(deleteIncome(id));
        if (res.meta.requestStatus === "fulfilled") {
            setAllIncome((prev) => prev.filter((item) => item._id !== id));
        }
    }
    useEffect(() => {
        setIncomeProp(income);
    }, [allIncome]);

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))


    return (
        <>
            <TopCards income={incomeProp} expense={expense} />
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Add New Income
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Source"
                        sx={{ mt: 2 }}
                        value={newIncome.source}
                        onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Amount"
                        // type="number"
                        name='amount'
                        sx={{ mt: 2 }}
                        value={newIncome.amount}
                        onChange={(e) => setNewIncome({ ...newIncome, amount: Number(e.target.value) })}
                        fullWidth
                    />
                    <TextField
                        // label="Date"
                        type="date"
                        sx={{ mt: 2 }}
                        // InputLabelProps={{ shrink: true }}
                        value={newIncome.date}
                        onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
                        fullWidth
                    />
                    <DialogActions>
                        <Button onClick={handleAddIncome} variant="contained" color="primary">
                            Add
                        </Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>

            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-evenly', flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "center" : "", gap: 2, }}>
                <Box sx={{ width: { xs: '100%', md: '50%' }, m: !isMobile ? 3 : 0, mr: !isMobile ? 1.5 : 0, }} size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 1, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Recent income transactions
                            <button style={{
                                float: 'right', padding: "3px 8px", backgroundColor: "#1876d3", color: "white", borderRadius: "5px", fontWeight: "600", margin: "5px", border: "none"
                            }}
                                onClick={() => { setOpen(true) }}>Add Income</button>
                        </Typography>
                        <Box sx={{flexGrow:1,overflowY:"auto"}}>
                            <List>
                                {currentTransactions.map((transaction, index) => (
                                    <ListItem key={index}
                                        sx={{
                                            '&:hover .delete-icon': { opacity: 1 },
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                        <AttachMoneyIcon color="success" sx={{ mr: 5 }} />

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
                        <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
                            Income by Date
                        </Typography>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: barChartData.map((d) => (d.date)) }]}
                            series={[
                                {
                                    data: barChartData.map((d) => (d.income)),
                                    label: "income",
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
