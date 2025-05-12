import Income from "../models/income.model.js";
import Expense from "../models/expense.model.js";
import mongoose from "mongoose";
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config({path:".env"}) 



// console.log(process.env.JWT_SECRET)


const groq = new Groq({ apiKey:process.env.GROQ_API_KEY});


export const weeklyInsights=async(req,res)=>{
    try {
        const userId = req.user._id;
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);

        const WeeklyExpense = await Expense.aggregate([
            {$match:{
                user:new mongoose.Types.ObjectId(userId),
                date:{$gte:lastWeek, $lte:today}
            }},{
                $group: {
                    _id:"$category",total:{$sum:"$amount"}
                }
            }
        ])
        const WeeklyIncome = await Income.aggregate([
            {$match:{
                user: new mongoose.Types.ObjectId(userId),
                date:{$gte:lastWeek, $lte:today}
            }},{
                $group: {
                    _id:"$source",total:{$sum:"$amount"}
                }
            }
        ])

        const total = {
            WeeklyIncome: WeeklyIncome,
            WeeklyExpense: WeeklyExpense
        }

        const insights= await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a smart financial assistant. Analyze the following weekly spending and income data and generate 2-3 personalized tips to help the user save money and improve their spending habits." },
                { role: "user", content: `Weekly Expenses:${JSON.stringify(WeeklyExpense)} Weekly Income: ${JSON.stringify(WeeklyIncome)} Your response should be short, friendly, and helpful, like a chatbot tip.samples of tips: "You spent 40% of your weekly income on dining. Consider reducing it by 10% to save more.", "Groceries make up a big portion of your expenses. Try meal planning to cut costs.", "Great job keeping your shopping expenses under 10% of your income!"Start the insights with smart tips. And also add line breaks between the tips.`}
              ],
            model: "llama-3.3-70b-versatile",
        })

        res.status(200).json({ message: "Insights generated successfully", insights })


    } catch (error) {
        console.log("Error in weekly insights controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }
}

export const monthlyInsights=async(req,res)=>{
    try {
        const userId = req.user._id;
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setDate(today.getDate() - 30);

        const MonthlyExpense = await Expense.aggregate([
            {$match:{
                user:new mongoose.Types.ObjectId(userId),
                date:{$gte:lastMonth, $lte:today}
            }},{
                $group: {
                    _id:"$category",total:{$sum:"$amount"}
                }
            }
        ])
        const MonthlyIncome = await Income.aggregate([
            {$match:{
                user:new mongoose.Types.ObjectId(userId),
                date:{$gte:lastMonth, $lte:today}
            }},{
                $group: {
                    _id:"$source",total:{$sum:"$amount"}
                }
            }
        ])

        const total = {
            MonthlyIncome: MonthlyIncome,
            MonthlyExpense: MonthlyExpense
        }

        const insights= await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a smart financial assistant. Analyze the following monthly spending and income data and generate 2-3 personalized tips to help the user save money and improve their spending habits." },
                { role: "user", content: `Monthly Expenses:${JSON.stringify(MonthlyExpense)} Monthly Income: ${JSON.stringify(MonthlyIncome)} Your response should be short, friendly, and helpful, like a chatbot tip.samples of tips: "You spent 40% of your monthly income on dining. Consider reducing it by 10% to save more.", "Groceries make up a big portion of your expenses. Try meal planning to cut costs.", "Great job keeping your shopping expenses under 10% of your income!"Start the insights with smart tips, amd`}
              ],
            model: "llama-3.3-70b-versatile",
        })

        res.status(200).json({ message: "Insights generated successfully", insights })      
    }
    catch (error) {
        console.log("Error in monthly insights controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }           
}

export const yearlyInsights=async(req,res)=>{
    try {
        const userId = req.user._id;
        const today = new Date();
        const lastYear = new Date();
        lastYear.setDate(today.getDate() - 365);

        const YearlyExpense = await Expense.aggregate([
            {$match:{
                user:new mongoose.Types.ObjectId(userId),
                date:{$gte:lastYear, $lte:today}
            }},{
                $group: {
                    _id:"$category",total:{$sum:"$amount"}
                }
            }
        ])
        const YearlyIncome = await Income.aggregate([
            {$match:{
                user:new mongoose.Types.ObjectId(userId),
                date:{$gte:lastYear, $lte:today}
            }},{
                $group: {
                    _id:"$source",total:{$sum:"$amount"}
                }
            }
        ])

        const total = {
            YearlyIncome: YearlyIncome,
            YearlyExpense: YearlyExpense
        }

        const insights= await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a smart financial assistant. Analyze the following yearly spending and income data and generate 2-3 personalized tips to help the user save money and improve their spending habits." },
                { role: "user", content: `Yearly Expenses:${JSON.stringify(YearlyExpense)} Yearly Income: ${JSON.stringify(YearlyIncome)} Your response should be short, friendly, and helpful, like a chatbot tip.samples of tips: "You spent 40% of your yearly income on dining. Consider reducing it by 10% to save more.", "Groceries make up a big portion of your expenses. Try meal planning to cut costs.", "Great job keeping your shopping expenses under 10% of your income!"Start the insights with smart tips`}
              ],
            model: "llama-3.3-70b-versatile",
        })

        res.status(200).json({ message: "Insights generated successfully", insights })      
    }
    catch (error) {
        console.log("Error in yearly insights controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }           
}           
