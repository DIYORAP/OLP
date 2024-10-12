import mongoose from "mongoose";

const profileSchema=new mongoose.Schema(
    {
        gender:{
            type:String,
            enum:['Male','Female','Non-Binary','not to say','Other','null'],
            default:null,
        },
        dob:{
            type:Date,
            default:null,

        },
        about:{
            type:String,
            trim:true,
            default:null,
            
        },
        contactNumber:{
            type:String,
            trim:true,
        },
    }
);

const Profile=mongoose.model("Profile",profileSchema);
export default Profile;