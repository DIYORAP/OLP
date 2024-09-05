import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto"


const studentSchema = new mongoose.Schema({

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
    
},

{
    timestamps:true,
}
)
const student = mongoose.model("student",studentSchema)

export {student}