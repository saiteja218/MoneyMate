import React from 'react'
import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Tabs, Tab, CircularProgress, useTheme } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import axiosInstance from '../utils/axios.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

export default function Insights() {
    const [tab, setTab] = useState(0);
    const [weeklyInsights, setWeeklyInsights] = useState("");
    const [monthlyInsights, setMonthlyInsights] = useState("");
    const [yearlyInsights, setYearlyInsights] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setLoading(true);
                const r1 = await axiosInstance.get('/insights/weekly');
                const r2 = await axiosInstance.get('/insights/monthly');
                const r3 = await axiosInstance.get('/insights/yearly');
                setWeeklyInsights(r1.data.insights.choices[0].message.content);
                setMonthlyInsights(r2.data.insights.choices[0].message.content);
                setYearlyInsights(r3.data.insights.choices[0].message.content);
                // console.log(r1.data.insights.choices[0].message.content);
                // console.log(r2.data.insights.choices[0].message.content);
                // console.log(r3.data.insights.choices[0].message.content);
            } catch (error) {
                console.log("Error in fetching insights", error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchInsights();
    }, [])

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    const displayInsight = () => {
        if (loading) return <CircularProgress sx={{ mt: 3 }} />;
        if (tab === 0) return <Typography>{weeklyInsights}</Typography>;
        if (tab === 1) return <Typography>{monthlyInsights}</Typography>;
        return <Typography>{yearlyInsights}</Typography>;
    };
    const theme = useTheme()
    const cardBg = theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5';

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pr: 4 }}>
                <ThemeToggle />
            </Box>
            <Box sx={{ maxWidth: 800, padding: '20px' }}>
                <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <SmartToyIcon sx={{ fontSize: 40, marginRight: '10px', color: "#3eaa85" }} />
                        <Typography variant="h4" component="h1">AI-Powered Insights</Typography>
                    </Box>
                    <Tabs value={tab} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                        <Tab label="Weekly" />
                        <Tab label="Monthly" />
                        <Tab label="Yearly" />
                    </Tabs>
                    <Box>
                        {
                            loading ? (
                                <CircularProgress />
                            ) : tab === 0 ? (
                                <Typography variant="body1" sx={{ marginTop: '20px' }}>
                                    {weeklyInsights}
                                </Typography>
                            ) : tab === 1 ? (
                                <Typography variant="body1" sx={{ marginTop: '20px' }}>
                                    {monthlyInsights}
                                </Typography>
                            ) : (
                                <Typography variant="body1" sx={{ marginTop: '20px' }}>
                                    {yearlyInsights}
                                </Typography>
                            )
                        }
                    </Box>
                </Paper>
            </Box>
        </>
    )
}
