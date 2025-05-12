import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Box, Grid } from '@mui/material'
import SideBar from '../components/SideBar'
import ExpenditureOverview from '../components/ExpenditureOverview'
import Income from '../components/Income'
import Expense from '../components/Expense'
import TopCards from '../components/TopCards'
import Insights from './Insights'
import Transactions from '../components/Transactions'



export default function Home() {
  return (
    <div >
      <Navbar />
      <Box sx={{ display: "flex", minHeight: '100vh' }}>

        <SideBar />
        <Box sx={{ flexGrow: 1, p: 1 }} >
          
          <Box sx={{ width: '100%', maxWidth: '100%', mt: 2}}>
            {/* <ExpenditureOverview /> */}
            <Routes>
            <Route path="/" element={<ExpenditureOverview />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
          </Box>
        </Box>

      </Box>
    </div>

  )
}
