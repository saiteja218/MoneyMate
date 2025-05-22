import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, useMediaQuery, useTheme, Button, Paper, TextField, Typography, IconButton } from '@mui/material';
import { SmartToy, Send } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import ExpenditureOverview from '../components/ExpenditureOverview';
import Income from '../components/Income';
import Expense from '../components/Expense';
import TopCards from '../components/TopCards';
import Insights from './Insights';
import Transactions from '../components/Transactions';
import TopBar from '../components/TopBar';
import SavingsGoals from './SavingsGoals';
import axiosInstance from '../utils/axios';
import ChatIcon from '../assets/chat-bot.png'




export default function Home() {
  const user = useSelector((state) => state.auth?.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [messages, setMessages] = useState([
    { sender: 'bot', message: "Hi! I'm your finance assistant. Ask me anything related to your expenses, savings, or income." }

  ])
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const conversation = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", message: input }
    setMessages((prev) => ([...prev, userMessage]))

    try {
      const data = await axiosInstance.post('/chat', {
        userId: user._id,
        message: input
      })

      // console.log(data.data.insights.choices[0].message.content);
      const botReply = { sender: "bot", message: data.data.insights.choices[0].message.content || "Sorry, I couldn't understand that." }
      setMessages((prev) => ([...prev, botReply]));
      setInput('')
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => ([...prev, { sender: "bot", message: "Error connecting to AI service." }]))
    }
  }

  const handleHandKeyPress = (e) => {
    if (e.key === 'Enter') {
      conversation();
    }
  }


  return (
    <div >
      {/* <Navbar /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {isMobile ? (
          <TopBar />
        ) : (
          <Box sx={{ height: "100vh" }}>
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
          {isChatOpen &&
            <Paper elevation={3} sx={{
              position: 'fixed',
              bottom: isMobile ? 0 : 80,
              right: isMobile ? 0 : 20,
              width: isMobile ? '100%' : 350,
              height: isMobile ? '100vh' : '70vh',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1000,
              padding: 2,
              backgroundColor: theme.palette.background.default,
              borderTopLeftRadius: isMobile ? 8 : 0,
              borderTopRightRadius: isMobile ? 8 : 0
            }}>
              {isMobile && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button size="small" onClick={() => setIsChatOpen(false)}>Close</Button>
                </Box>
              )}
              <Box sx={{ flex: 1, overflow: "auto", scrollbarWidth: 'none' }}>
                {messages.map((m, index) => (
                  <Box key={index} sx={{
                    display: "flex",
                    justifyContent: m.sender === "bot" ? "flex-start" : "flex-end",


                  }}>
                    {/* <SmartToy/> */}
                    <Box sx={{
                      color: "white",
                      backgroundColor: m.sender === "bot" ? "#e33457" : "#3fa884",
                      p: "10px",
                      borderRadius: m.sender === "bot" ? "0 15px 15px 15px" : "15px 15px 0px 15PX",
                      maxWidth: "80%",
                      mb: 1

                    }}>
                      <Typography variant="body2">{m.message}</Typography>
                    </Box>
                  </Box>

                ))}
                <div ref={chatEndRef} />

              </Box>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  placeholder='Enter your question here..'
                  value={input}
                  variant="outlined"
                  size="small"
                  onChange={(e) => { setInput(e.target.value) }}
                  onKeyUp={handleHandKeyPress}

                />
                <IconButton onClick={conversation}
                ><Send /></IconButton>

              </Box>
            </Paper>
          }
          {/* <IconButton><SmartToy/></IconButton> */}

          <Button
            onClick={() => setIsChatOpen(prev => !prev)}
            sx={{
              display:(isMobile && isChatOpen)?'none':"",
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 1001,
              backgroundColor: '#1976d2',
              borderRadius: "10px 10px 0 10px",
              padding: "10px",
              color: 'white',
              '&:hover': {
                backgroundColor: '#1565c0',
              }
            }}
          >
            <SmartToy />
          </Button>
        </Box>
      </Box>
    </div>

  )
}
