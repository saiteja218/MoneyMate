import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import SideBar from '../components/SideBar'
import ExpenditureOverview from '../components/ExpenditureOverview'
import Income from '../components/Income'
import Expense from '../components/Expense'
import TopCards from '../components/TopCards'
import Insights from './Insights'
import Transactions from '../components/Transactions'
import TopBar from '../components/TopBar'
import SavingsGoals from './SavingsGoals'



export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div >
      {/* <Navbar /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {isMobile ? (
          <TopBar />
        ) : (
          <Box sx={{ minHeight: "100vh" }}>
            <SideBar />
          </Box>
        )}

        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Box sx={{ width: "100%" }}>
            <Routes>
              <Route path="/" element={<ExpenditureOverview />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/savingsGoals" element={<SavingsGoals />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </div>
 
  )
}
