import Expense from "../models/expense.model.js";

export const addExpense=async(req,res)=>{
    const {category,amount,date}=req.body;
    try {
        if(!category || !amount || !date) {
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const newExpense=new Expense({
            user:req.user._id,
            category,
            amount,
            date
        })
        if(newExpense){
            await newExpense.save();
            return res.status(201).json(newExpense)
        }else{
            return res.status(400).json({message:"Expense not found"})
        }
    } catch (error) {
        console.log("Error in add expense controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getAllExpense=async(req,res)=>{   
    const id=req.user._id; 
    
    try {
        const expenses= await Expense.find({user:id}).sort({ createdAt: -1 })
        if(expenses) {
            return res.status(200).json(expenses)
        } else {
            return res.status(400).json({ message: "No expense found" })
        }
    } catch (error) {
        console.log("Error in get all expense controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }
} 

export const deleteExpense=async(req,res)=>{
    const {id}=req.params;
    try {
        const deleteExpense= await Expense.findByIdAndDelete(id) 
        if(deleteExpense) {
            return res.status(200).json({ message: "Expense deleted successfully" })
        } else {
            return res.status(400).json({ message: "No expense found" })
        }
    } catch (error) {
        console.log("Error in delete expense controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }
}
