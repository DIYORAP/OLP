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


export const upadteDisplaypicture=async(req,res,next)=>{
    try {
        

        const id=req.user.id;
        const user=await User.findById(id);
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"user not found",
            });

        }

        const image =req.files.pfp;

        if(!image)
        {
            return res.status(404).json({
                success:false,
                message:"image not found",

            });

        }

        const uploadDetails=await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME
        );
        console.log(uploadDetails);

        const uploadImage=await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{new:true});


        return res.status(200).json({
            success:true,
            message:"image upadate sucdesfully",
            data:uploadImage,
        });

    } catch (error) {
       console.log("uplaiod image error",error);
       return res.status(500).json({
        success:false,
        message:error.message,
       });
    }
}