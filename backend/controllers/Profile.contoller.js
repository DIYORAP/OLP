import Profile from "../model/Profile.model.js"
import User from "../model/User.model.js"
import Course from "../model/Course.model.js"
import uploadImageToCloudinary from "../utils/cloudUploader.js"


export const updateProfile=async(req,res,next)=>{
    try {
        const {dateOfBirth ="",about=" ",contactNumber="",username,gender=""}=req.body;

        const id =req.user.id;


        const userDetails=await User.findById(id);
        const profile =await Profile.findById(userDetails.additionalDetails);
        userDetails.username=username || userDetails.username;
        profile.dateOfBirth=dateOfBirth||profile.dateOfBirth;
        profile.about=about|| profile.about;
        profile.gender=gender||profile.gender;
        profile.contactNumber= contactNumber ||profile.contactNumber;


        await profile.save();
        await userDetails.save();

        return res.json({
            success:true,
            message:"profile updated successfully",
            profile,
            userDetails
        })
    } catch (error) {
         console.log("profile upadting eror",error);
         return res.status(500).json({
            success:false,
            error:error.message,
         });
    }
}
