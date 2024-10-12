import Course from "../model/Course.model.js"
import Category from "../model/Category.model.js"
import User from "../model/User.model.js";
import cloudUploader from '../utils/cloudUploader.js';
import ErrorResponse from "../utils/ErrorResponse";
import Section from "../model/Section.model.js"

export const createCourse=async(req,res,next)=>{
    try { 
        const instructorId=req.user.id;
        const{title,description,whatYouWillLearn,price,category}=req.body;
        const tags = req.body?.tags ? JSON.parse(req.body?.tags) : null;
        const instructions = req.body?.instructions ? JSON.parse(req.body?.instructions) : null;
        const thumbnail = req.files?.thumbnail;

        if (!(instructorId && title && description && whatYouWillLearn && price && category && tags && instructions && thumbnail)) {
            return next(new ErrorResponse('All fields are mandatory', 404));
          }


        if (thumbnail.size > process.env.THUMBNAIL_MAX_SIZE) {
            return next(new ErrorResponse(`Please upload a image less than ${process.env.THUMBNAIL_MAX_SIZE / 1024} KB`, 400));
          }

          if (!thumbnail.mimetype.startsWith('image')) {
            return next(new ErrorResponse('Please upload a image file', 400));
          }
      
          const allowedFileType = ['jpeg', 'jpg', 'png'];
          const thumbnailType = thumbnail.mimetype.split('/')[1];
      
          if (!allowedFileType.includes(thumbnailType)) {
            return next(new ErrorResponse('Please upload a valid image file', 400));
          }
      
          thumbnail.name = `thumbnail_${instructorId}_${Date.now()}`;
          const image = await cloudUploader(thumbnail, process.env.THUMBNAIL_FOLDER_NAME, 200, 80);
      
          // create course
          const courseDetails = await Course.create({
            title,
            description,
            instructor: instructorId,
            whatYouWillLearn,
            price,
            category,
            instructions,
            thumbnail: image.secure_url,
            tags,
          });
      
          // update user
          await User.findByIdAndUpdate(
            instructorId,
            {
              $push: { courses: courseDetails._id },
            },
            { new: true }
          );
      
          // update category
          await Category.findByIdAndUpdate(
            categoryDetails._id,
            {
              $push: { courses: courseDetails._id },
            },
            { new: true }
          );  

          const courseFullDetails = await Course.findById(courseDetails._id)
      .populate({
        path: 'instructor',
        populate: {
          path: 'profile',
        },
      })
      .populate('category')
      .populate('reviews')
      .populate({
        path: 'sections',
        populate: {
          path: 'subSections',
        },
      })
      .exec();

    res.status(201).json({
      success: true,
      data: courseFullDetails,
    });
  } catch (error) {
    next(new ErrorResponse('Failed to create course', 500));
  }   
}