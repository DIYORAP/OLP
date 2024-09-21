import mongoose from "mongoose"

const adminSchema =  new mongoose.Schema({

    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    
    password:{
        type:String,
        required: true,
    },

    // Refreshtoken:{
    //     type:String,
    // },

}) 




const admin = mongoose.model("admin",adminSchema);

export {admin}