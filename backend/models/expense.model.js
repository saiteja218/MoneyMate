import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
        required: true, 
    },
    category:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    
    date:{
        type: Date,
        required: true,
    },
    
},{
    timestamps: true,
})

const Expense=mongoose.model('Expense',expenseSchema);
export default Expense;