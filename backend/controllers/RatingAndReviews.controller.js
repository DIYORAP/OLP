import RatingAndReview from "../model/RatingAndReview.model.js"
import Course from "../model/Course.model.js"
import mongoose from "mongoose"


export default createRating=async(req,res,next)=>{
    try {
        const userId=req.user.id;
        const {rating, review,courseId} = req.body;
        const courseDetails= await Course.find({_id: courseId,
         studentsEnrolled: {$elemMatch:{$eq:userId}}});
     
         if(!courseDetails){
             return res.status(404).json({success:false,emessage: "Student not enrolled in course"});
         };
         const alreadyReviewed =await RatingAndReview.findOne({user:userId,
         course:courseId});
     
         if(alreadyReviewed){
             return res.status(404).json({success: false,message: "Already reviewed"});
         }
         const ratingReview= await RatingAndReview.create({rating,
             review,
             course:courseId,
             user:userId});
     
     
             await Course.findByIdAndUpdate({_id:courseId},
                 {
                 $push:{
                 ratingAndReviews: ratingReview._id
             }});
     
     
         res.status(200).json({
            success: true,
            message: "Rating added successfully",
            ratingReview});
        
      } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message}); 
      }
}