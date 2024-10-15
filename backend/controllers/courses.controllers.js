import Course from "../model/Course.model.js";
import Category from "../model/Category.model.js";
import User from "../model/User.model.js";
import uploadImageToCloudinary from "../utils/cloudUploader.js"
import ErrorResponse from "../utils/ErrorResponse.js";
import Section from "../model/Section.model.js";

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
			role: "Student",
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

export const getFullCourseDetails = async (req, res) => {
	try {
	  const { courseId } = req.body
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
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
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
  
	  // if (courseDetails.status === "Draft") {
	  //   return res.status(403).json({
	  //     success: false,
	  //     message: `Accessing a draft course is forbidden`,
	  //   });
	  // }
  
	  let totalDurationInSeconds = 0
	  courseDetails.courseContent.forEach((content) => {
		content.subSection.forEach((subSection) => {
		  const timeDurationInSeconds = parseInt(subSection.timeDuration)
		  totalDurationInSeconds += timeDurationInSeconds;
		})
	  })
  
	  const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
	  return res.status(200).json({
		success: true,
		data: {
		  courseDetails,
		  totalDuration,
		  completedVideos: courseProgressCount?.completedVideos
			? courseProgressCount?.completedVideos
			: ["none"],
		},
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }



  //delete course create
export const deleteCourse=async (req, res) => {
	try {
	  const { courseId } = req.body
	  // Find the course
	  const course = await Course.findById(courseId)
	  if (!course) {
		return res.status(404).json({ message: "Course not found" })
	  }
  
	  // Unenroll students from the course
	  const studentsEnrolled = course.studentsEnrolled
	  for (const studentId of studentsEnrolled) {
		await User.findByIdAndUpdate(studentId, {
		  $pull: { courses: courseId },
		})
	  }
  
	  // Delete sections and sub-sections
	  const courseSections = course.courseContent
	  for (const sectionId of courseSections) {
		// Delete sub-sections of the section
		const section = await Section.findById(sectionId)
		if (section) {
		  const subSections = section.subSection
		  for (const subSectionId of subSections) {
			await SubSection.findByIdAndDelete(subSectionId);
		  }
		}
  
		// Delete the section
		await Section.findByIdAndDelete(sectionId)
	  }
  
	  // Delete the course
	  await Course.findByIdAndDelete(courseId)

	  //Delete course id from Category
	  await Category.findByIdAndUpdate(course.category._id, {
		$pull: { courses: courseId },
	     })
	
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

  //mark lecture as completed
export const markLectureAsComplete = async (req, res) => {
	const { courseId, subSectionId, userId } = req.body
	if (!courseId || !subSectionId || !userId) {
	  return res.status(400).json({
		success: false,
		message: "Missing required fields",
	  })
	}
	try {
	progressAlreadyExists = await CourseProgress.findOne({
				  userID: userId,
				  courseID: courseId,
				})
	  const completedVideos = progressAlreadyExists.completedVideos
	  if (!completedVideos.includes(subSectionId)) {
		await CourseProgress.findOneAndUpdate(
		  {
			userID: userId,
			courseID: courseId,
		  },
		  {
			$push: { completedVideos: subSectionId },
		  }
		)
	  }else{
		return res.status(400).json({
			success: false,
			message: "Lecture already marked as complete",
		  })
	  }
	  await CourseProgress.findOneAndUpdate(
		{
		  userId: userId,
		  courseID: courseId,
		},
		{
		  completedVideos: completedVideos,
		}
	  )
	return res.status(200).json({
	  success: true,
	  message: "Lecture marked as complete",
	})
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}

}