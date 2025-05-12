import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.route.js';
import incomeRoutes from './routes/income.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import insightsRoutes from './routes/insights.routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path'

dotenv.config({path:".env"})    
 
const app = express();

const __dirname=path.resolve()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());



app.use('/api/auth', userRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/insights', insightsRoutes);
// console.log(process.env.GROQ_API_KEY)


if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);
connectDB();