import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
        required: true, 
    },
    source:{
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

const Income=mongoose.model('Income',incomeSchema);
export default Income;