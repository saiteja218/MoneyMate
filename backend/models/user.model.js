import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    otp:{
        type:String
    },
    otpExpires: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
})

const User=mongoose.model('User',userSchema);
export default User;