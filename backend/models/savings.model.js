import mongoose from 'mongoose';

const savingsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    targetAmount: {
        type: Number,
        required: true
    },
    savedAmount: {
        type: Number,
        default: 0
    },
    deadline: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const Savings = mongoose.model("savings", savingsSchema);
export default Savings;

