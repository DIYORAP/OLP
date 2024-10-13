import Course from "../model/Course.model.js";
import Category from "../model/Category.model.js";
import User from "../model/User.model.js";
import uploadImageToCloudinary from "../utils/cloudUploader.js"
import ErrorResponse from "../utils/ErrorResponse.js";
import Section from "../model/Section.model.js";

export const createCourse = async (req, res, next) => {
  try {
    const instructorId = req.user.id;
    const { title, description, whatYouWillLearn,tags, price, category,status,instructions } = req.body;
   
   // const thumbnail = req.files.thumbnail;

    // Check for missing fields
    if (!(instructorId && title && description && whatYouWillLearn && price && category && tags && instructions)) {
      return next(new ErrorResponse('All fields are mandatory', 400));
    }

    if (!status || status === undefined) {
			status = "Draft";
		}
    	
    // Check if the user is an instructor
    const instructorDetails = await User.findById(instructorId, {
			role: "Instructor",
		});

    if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

  	// Upload the Thumbnail to Cloudinary
    // const thumbnailImage = await uploadImageToCloudinary(
		// 	thumbnail,
		// 	process.env.FOLDER_NAME
		// );
		// console.log(thumbnailImage);

    
    // Create a new course with the given details
		const newCourse = await Course.create({
			title,
			description,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tags: tags,
			//category:categoryDetails._id,
			thumbnail:"https://link_to_uploaded_thumbnail.com/image.jpg",                                            //thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

  

      await User.findByIdAndUpdate(
        {
          _id: instructorDetails._id,
        },
        {
          $push: {
            courses: newCourse._id,
          },
        },
        { new: true }
      );
      // Add the new course to the Categories
      // await Category.findByIdAndUpdate(
      //   { _id: category },
      //   {
      //     $push: {
      //       course: newCourse._id,
      //     },
      //   },
      //   { new: true }
      // );

      res.status(200).json({
        success: true,
        data: newCourse,
        message: "Course Created Successfully",
      });
  
  } catch (error) {
    console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
    next(new ErrorResponse('Failed to create course', 500));
  }
};


export const getAllCourses=async(req,res,next)=>{
  try {
       const allCourses=await Course.find({},{
        title:true,
        price:true,
        thumbnail:true,
        instructor:true,
        ratingAndReviews: true,
				studentsEnroled: true,
       }).populate("instructor").exec();


       return res.status(200).json({
        success:true,
        data:allCourses
       });
  } catch (error) {
     console.log(error);
     return res.status(404).json({
      success:false,
      message:"Cant fetch course data",
      error:error.message,
     });
  }
};