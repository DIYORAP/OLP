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

export const getEnrolledCourses=async(req,res) => {
	try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const enrolledCourses = await User.findById(id).populate({
			path : "courses",
				populate : {
					path: "courseContent",
			}
		}
		).populate("courseProgress").exec();
        // console.log(enrolledCourses);
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: enrolledCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const instructorDashboard = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized: No user found",
			});
		}

		const id = req.user.id;
		console.log("Instructor ID:", id);

		const courseData = await Course.find({ instructor: id });

		const courseDetails = courseData.map((course) => {
			let totalStudents = course?.studentsEnrolled?.length || 0;
			let totalRevenue = (course?.price || 0) * totalStudents;

			return {
				_id: course._id,
				courseName: course.title,
				courseDescription: course.description,
				totalStudents,
				totalRevenue,
			};
		});

		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: courseDetails,
		});
	} catch (error) {
		console.error("Server Error:", error);
		return res.status(500).json({
			success: false,
			message: "Internal Server Error: " + error.message,
		});
	}
};

export const adminShowAllStudents = async (req, res) => {
	try {
		// Fetch all students and their enrolled courses
		const students = await User.aggregate([
			{ $match: { role: "student" } },
			{
				$lookup: {
					from: "courses",
					localField: "enrolledCourses",
					foreignField: "_id",
					as: "enrolledCourseDetails",
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					email: 1,
					enrolledCourses: "$enrolledCourseDetails.title",
				},
			},
		]);

		// Fetch all courses to calculate total students and revenue
		const courseData = await Course.find({});
		const courseDetails = courseData.map((course) => {
			let totalStudents = course?.studentsEnrolled?.length || 0;
			let totalRevenue = (course?.price || 0) * totalStudents;

			return {
				_id: course._id,
				courseName: course.title,
				courseDescription: course.description,
				totalStudents,
				totalRevenue,
			};
		});

		// Calculate total students and revenue across all courses
		const totalStudents = courseDetails.reduce((acc, course) => acc + course.totalStudents, 0);
		const totalRevenue = courseDetails.reduce((acc, course) => acc + course.totalRevenue, 0);

		res.status(200).json({
			success: true,
			message: "All students and revenue fetched successfully",
			data: {
				students,
				courseDetails,
				totalStudents,
				totalRevenue,
			},
		});
	} catch (error) {
		console.error("Error fetching students & revenue:", error);
		return res.status(500).json({
			success: false,
			message: "Internal Server Error: " + error.message,
		});
	}
};

export const getadminCourses=async(req,res) => {
	try {
        const courseData = await Course.find({ });
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: courseData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}