import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto"

const teacherSchema = new mongoose.Schema({

    Email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true,
    },

    Firstname:{
        type:String,
        required:true,
        trim:true,
        
    },

    Lastname:{
        type:String,
        required:true,
        trim:true,
    },

    Password:{
        type:String,
        required: true,
    },
    Isverified: {
        type:Boolean,
        default:false,
    },

    Isapproved:{
        type: String,
        enum: ['approved', 'rejected', 'pending', 'reupload'],
        default: 'pending',
    },

    Remarks:{
        type:String
    },
    
    Refreshtoken:{
        type:String,
    },

    Teacherdetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacherdocs"
    },

    Balance: {
        type: Number,
        default: 0,
    },
   
    WithdrawalHistory: [{
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }],


    enrolledStudent: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student'
        },
        isNewEnrolled: {
            type: Boolean,
            default: true
        }
    }]

},  
{
    timestamps:true,
}
)
const Teacher = mongoose.model("teacher",teacherSchema)
export {Teacher}
