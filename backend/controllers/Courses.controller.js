import Course from "../model/Course.model.js";
import User from "../model/User.model.js";
import uploadImageToCloudinary from "../utils/cloudUploader.js"
import ErrorResponse from "../utils/ErrorResponse.js";
import Section from "../model/Section.model.js";
import CourseProgress from "../model/CourseProgress.model.js"
import SubSection from '../model/SubSection.model.js'

export const createCourse = async (req, res, next) => {
  try {
    const instructorId = req.user.id;
	console.log(instructorId)
    let { title, description, whatYouWillLearn,tag, price, category,status,instructions } = req.body;
	
	const thumbnail = req.files?.thumbnailImage;
    console.log("image",thumbnail)
    // Check for missing fields
    if (!(instructorId || title || description || whatYouWillLearn || price || category || tag )) {
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
    const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);

    
    // Create a new course with the given details
		const newCourse = await Course.create({
			title,
			description,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tags: tag,
			category,
			thumbnail:thumbnailImage.secure_url,
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

export const editCourse = async (req, res) => {
	try {
	  const { courseId, status } = req.body; // Include status for publish/draft
	  const updates = req.body; // You might want to use this to set other fields
	  const course = await Course.findById(courseId);
  
	  if (!course) {
		return res.status(404).json({ error: "Course not found" });
	  }
  
	  // Update course status based on the provided status
	  if (status) {
		course.status = status; // Assuming 'status' can be 'published' or 'draft'
	  }
  
	  // If Thumbnail Image is found, update it
	  if (req.files) {
		console.log("thumbnail update");
		const thumbnail = req.files?.thumbnailImage;
		const thumbnailImage = await uploadImageToCloudinary(
		  thumbnail,
		  process.env.FOLDER_NAME
		);
		course.thumbnail = thumbnailImage.secure_url;
	  }
	//   console.log(thumbnail);
	//   console.log(thumbnailImage);
	/// baki che imagwe upadate nathi thadi [achi ho
	
	  for (const key in updates) {
		if (Object.prototype.hasOwnProperty.call(updates, key)) {
			if (key === "tags") {
				course[key] = JSON.parse(updates[key]);
			} else {
				course[key] = updates[key];
			}
		}
	}
	
    
	  await course.save();
  
	  const updatedCourse = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		//.populate("RatingAndReview")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "SubSection",
		  },
		})
		.exec();
  
	  res.json({
		success: true,
		message: "Course updated successfully",
		data: updatedCourse,
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({
		success: false,
		message: "Internal server error",
		error: error.message,
	  });
	}
  };
  

export const getFullCourseDetails = async (req, res) => {

	try {
	  const { courseId } = req.body
	  console.log("Course ID:", courseId)
	  const userId = req.user.id
	  const courseDetails = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
        //.populate("RatingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "SubSection",
		  },
		})
		.exec()

		
	   let courseProgressCount = await CourseProgress.findOne({
	   courseID: courseId,
		userID: userId,
	  })
  
	  console.log("courseProgressCount : ", courseProgressCount)
  
	  if (!courseDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find course with id: ${courseId}`,
		})
	  }
  
	//   if (courseDetails.status === "Draft") {
	//     return res.status(403).json({
	//       success: false,
	//       message: `Accessing a draft course is forbidden`,
	//     });
	//   }
  
  
	  return res.status(200).json({
		success: true,
		data: {
		  courseDetails,
		   completedVideos: courseProgressCount?.completedVideos
		 	? courseProgressCount?.completedVideos
		 	: ["none"],
		},
	  })
	} catch (error) {
		console.log(error)
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }



  //delete course create
export const deleteCourse=async (req, res,next) => {
	try {
	  const { courseId } = req.body
	  const course = await Course.findById(courseId)
	  if (!course) {
		return res.status(404).json({ message: "Course not found" })
	  }
  
	  const studentsEnrolled = course.studentsEnrolled
	  for (const studentId of studentsEnrolled) {
		await User.findByIdAndUpdate(studentId, {
		  $pull: { courses: courseId },
		})
	  }
  
	  // Delete sections and sub-sections
	  const courseSections = course.courseContent
	  for (const sectionId of courseSections) {
		const section = await Section.findById(sectionId)
		if (section) {
		  const subSections = section.SubSection
		  for (const subSectionId of subSections) {
			await SubSection.findByIdAndDelete(subSectionId);
		  }
		}
  
		// Delete the section
		await Section.findByIdAndDelete(sectionId)
	  }
  
	  // Delete the course
	  await Course.findByIdAndDelete(courseId)

	
	//Delete course id from Instructor
	await User.findByIdAndUpdate(course.instructor._id, {
		$pull: { courses: courseId },
		 })
  
	  return res.status(200).json({
		success: true,
		message: "Course deleted successfully",
	  })
	} catch (error) {
	  console.error(error)
	  return res.status(500).json({
		success: false,
		message: "Server error",
		error: error.message,
	  })
	}
  }



   // finding created course nichena couse vartical vala course valu che
  export const getInstructorCourses=async(req,res,next)=>{
	try {
		 const insrID=req.user.id;

		 const courses=await Course.find({instructor:insrID});

		 res.status(200).json({
			success:true,
			data:courses,
		 });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success:false,
			message:"failed to find course",
            error:error.message,
		})
	}
  }
 
  export const getAll = async (req, res) => {
	
  try {
const courseDetails=await Course.find({}).populate({path:"instructor",
populate:{path:"additionalDetails"}})
.populate("category")
.populate({                    
	path:"ratingAndReviews",
	populate:{path:"user"
	 ,select:"username role profilePic"}
 })
.populate({path:"courseContent",populate:{path:"SubSection"}})
.exec();

if(!courseDetails){
	return res.status(404).json({
		success:false,
		message:"Course Not Found"
	})
}
return res.status(200).json({
	success:true,
	message:"Course fetched successfully now",
	data:courseDetails
});
	
} catch (error) {
	console.log(error);
	return res.status(404).json({
		success:false,
		message:`Can't Fetch Course Data`,
		error:error.message
	})
	
}
  };
  
  export const getCourseDetails = async (req,res)=>{
	try {
		const {courseId}=req.body;
	const courseDetails=await Course.find({_id: courseId}).populate({path:"instructor",
	populate:{path:"additionalDetails"}})
	.populate("category")
	.populate({                    
		path:"ratingAndReviews",
		populate:{path:"user"
	 	,select:"username role profilePic"}
	 })
	.populate({path:"courseContent",populate:{path:"SubSection"}})
	.exec();

	if(!courseDetails){
		return res.status(404).json({
            success:false,
            message:"Course Not Found"
        })
	}
	return res.status(200).json({
        success:true,
		message:"Course fetched successfully now",
        data:courseDetails
    });
		
	} catch (error) {
		console.log(error);
        return res.status(404).json({
            success:false,
			message:`Can't Fetch Course Data`,
			error:error.message
        })
		
	}

}


export const markLectureAsComplete = async (req, res) => {
	const { courseId, subSectionId, userId } = req.body;
  
	if (!courseId || !subSectionId || !userId) {
	  return res.status(400).json({
		success: false,
		message: "Missing required fields",
	  });
	}
  
	try {
	  // Check if progress record exists
	  const progressAlreadyExists = await CourseProgress.findOne({
		userID: userId, // Ensure field matches database schema
		courseID: courseId,
	  });
  
	  if (!progressAlreadyExists) {
		return res.status(404).json({
		  success: false,
		  message: "Course progress not found for this user",
		});
	  }
  
	  if (progressAlreadyExists.completedVideos.includes(subSectionId)) {
		return res.status(400).json({
		  success: false,
		  message: "Lecture already marked as complete",
		});
	  }
  
	  // Mark lecture as completed
	  await CourseProgress.findOneAndUpdate(
		{
		  userID: userId,
		  courseID: courseId,
		},
		{
		  $addToSet: { completedVideos: subSectionId }, // Prevents duplicates
		}
	  );
  
	  return res.status(200).json({
		success: true,
		message: "Lecture marked as complete",
	  });
	} catch (error) {
	  console.error("Error marking lecture as complete:", error);
	  return res.status(500).json({
		success: false,
		message: "Internal server error",
		error: error.message,
	  });
	}
  };