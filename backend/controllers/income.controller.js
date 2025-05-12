import Income from "../models/income.model.js";

export const addIncome = async (req, res) => {
    const { source,amount,date } = req.body;
    try {
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const newIncome = new Income({
            user: req.user._id,
            source,
            amount,
            date
        })
        if (newIncome) {
            await newIncome.save();
            return res.status(201).json(newIncome)
        } else {
            return res.status(400).json({ message: "Income not found" })
        }
    } catch (error) {
        console.log("Error in add income controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getAllIncome=async(req,res)=>{
    const id=req.user._id;
    try {
        const incomes= await Income.find({user:id}).sort({ createdAt: -1 })
        if(incomes) {
            return res.status(200).json(incomes)
        } else {
            return res.status(400).json({ message: "No income found" })
        }
    } catch (error) {
        console.log("Error in get all income controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }
}

export const deleteIncome=async(req,res)=>{
    const {id}=req.params;
    try {
        const deleteIncome= await Income.findByIdAndDelete(id)
        if(deleteIncome) {
            return res.status(200).json({ message: "Income deleted successfully" })
        } else {
            return res.status(400).json({ message: "No income found" })
        }
    } catch (error) {
        console.log("Error in delete income controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }
}