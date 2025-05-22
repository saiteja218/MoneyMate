import Income from "../models/income.model.js";
import Expense from "../models/expense.model.js";
import Savings from "../models/savings.model.js";
import User from '../models/user.model.js'
import mongoose from "mongoose";
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const chat = async (req, res) => {
  const { userId, message } = req.body;
  try {
    const today = new Date().toISOString().slice(0, 10)
    const user=await User.find({_id:userId})
    const income = await Income.find({ user: userId });
    const expense = await Expense.find({ user: userId });
    const savings = await Savings.find({ user: userId });
    const name=user.name
    const insights = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are MoneyMate, a smart and trustworthy financial assistant. You analyze the user's income, expenses, and savings data. Only respond based on the data provided. If the information is missing or unclear, ask follow-up questions or say you need more data.Responses should consize, informative and only in one or two sentense.And mind you all transactions are happening in rupees(₹). Do not add \n in response please",
        },
        {
          role: "user",
          content:
            `User Data: Name: ${name}, Income Transactions:,- ${JSON.stringify(income)} , Expense Transactions: ,- ${JSON.stringify(expense)} , Savings Goals: , ${JSON.stringify(savings)} , today: ${today}
             Query: "${message}" `,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    res
      .status(200)
      .json({ message: "Bot response generated successfully", insights });
  } catch (error) {
    console.log("Error in weekly insights controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


