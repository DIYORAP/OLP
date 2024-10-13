import Course from "../model/Course.model.js";
import Category from "../model/Category.model.js";
import User from "../model/User.model.js";
import cloudUploader from '../utils/cloudUploader.js';
import ErrorResponse from "../utils/ErrorResponse.js";
import Section from "../model/Section.model.js";

export const createCourse = async (req, res, next) => {
  try {
    const instructorId = req.user.id;
    const { title, description, whatYouWillLearn, price, category } = req.body;
    const tags = req.body?.tags ? JSON.parse(req.body?.tags) : null;
    const instructions = req.body?.instructions ? JSON.parse(req.body?.instructions) : null;
    const thumbnail = req.files?.thumbnail;

    // Check for missing fields
    if (!(instructorId && title && description && whatYouWillLearn && price && category && tags && instructions && thumbnail)) {
      return next(new ErrorResponse('All fields are mandatory', 400));
    }

    // Validate thumbnail size
    if (thumbnail.size > process.env.THUMBNAIL_MAX_SIZE) {
      return next(new ErrorResponse(`Please upload an image less than ${process.env.THUMBNAIL_MAX_SIZE / 1024} KB`, 400));
    }

    // Validate thumbnail type
    if (!thumbnail.mimetype.startsWith('image')) {
      return next(new ErrorResponse('Please upload an image file', 400));
    }

    const allowedFileTypes = ['jpeg', 'jpg', 'png'];
    const thumbnailType = thumbnail.mimetype.split('/')[1];

    if (!allowedFileTypes.includes(thumbnailType)) {
      return next(new ErrorResponse('Please upload a valid image file (jpeg, jpg, png)', 400));
    }

    // Upload the thumbnail
    try {
      thumbnail.name = `thumbnail_${instructorId}_${Date.now()}`;
      const image = await cloudUploader(thumbnail, process.env.THUMBNAIL_FOLDER_NAME, 200, 80);

      // Create course
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

      // Update user with the new course
      try {
        await User.findByIdAndUpdate(
          instructorId,
          { $push: { courses: courseDetails._id } },
          { new: true }
        );
      } catch (userUpdateError) {
        return next(new ErrorResponse('Failed to update user with the new course', 500));
      }

      // Update category with the new course
      try {
        await Category.findByIdAndUpdate(
          category,
          { $push: { courses: courseDetails._id } },
          { new: true }
        );
      } catch (categoryUpdateError) {
        return next(new ErrorResponse('Failed to update category with the new course', 500));
      }

      // Get full course details with population
      const courseFullDetails = await Course.findById(courseDetails._id)
        .populate({
          path: 'instructor',
          populate: { path: 'profile' },
        })
        .populate('category')
        .populate('reviews')
        .populate({
          path: 'sections',
          populate: { path: 'subSections' },
        })
        .exec();

      // Send response
      res.status(201).json({
        success: true,
        data: courseFullDetails,
      });
    } catch (uploadError) {
      return next(new ErrorResponse('Thumbnail upload failed', 500));
    }
  } catch (error) {
    next(new ErrorResponse('Failed to create course', 500));
  }
};
