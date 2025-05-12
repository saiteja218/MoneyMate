import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path:".env"})   

const mongoURI =  process.env.MONGODB_URI ;  

// console.log(process.env.MONGODB_URI)
export const connectDB=async ()=>{
    try{
         
        const conn= await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(err){
        console.log(`MongoDB connection Error: ${err.message}`)
      
    }
}   
   