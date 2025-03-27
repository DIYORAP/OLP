import Profile from "../model/Profile.model.js"
import User from "../model/User.model.js"
import Course from "../model/Course.model.js"
import uploadImageToCloudinary from "../utils/cloudUploader.js"
import moment from "moment";

export const updateProfile = async (req, res, next) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber = "", username, gender = "" } = req.body;
        const id = req.user?.id; 

        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user ID provided",
            });
        }

        const userDetails = await User.findById(id).populate("additionalDetails");
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profile = userDetails.additionalDetails;
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile details not found",
            });
        }

        if (contactNumber && !/^\d{10,15}$/.test(contactNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact number format",
            });
        }

        if (username) userDetails.username = username;
        if (dateOfBirth) profile.dob = new Date(dateOfBirth); 
        if (about) profile.about = about;
        if (gender) {
            if (!["Male", "Female", "Non-Binary", "not to say", "Other", "null"].includes(gender)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid gender value",
                });
            }
            profile.gender = gender;
        }
        if (contactNumber) profile.contactNumber = contactNumber;

        await profile.save();
        await userDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            userDetails,
        });
    } catch (error) {
        console.error("Profile updating error:", error);
        
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

export const updateDisplayPicture = async (req, res) => {
    try {
        const { id } = req.user;
		console.log(id)

        if (!req.files || !req.files.profilePic) {
            return res.status(400).json({ success: false, message: "No image provided" });
        }

        const profilePic = req.files.profilePic;

        console.log("Received File:", profilePic.name);
        const uploadDetails = await uploadImageToCloudinary(profilePic, process.env.FOLDER_NAME);

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        user.profilePic = uploadDetails.secure_url;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Upload image error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
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


export const adminShowAllStudents2 = async (req, res) => {
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

		const courseData = await Course.aggregate([
			{
				$unwind: "$studentsEnrolled", 
			},
			{
				$lookup: {
					from: "users",
					localField: "studentsEnrolled",
					foreignField: "_id",
					as: "studentDetails",
				},
			},
			{
				$unwind: "$studentDetails",
			},
			{
				$group: {
					_id: {
						month: { $month: "$studentDetails.createdAt" },
						year: { $year: "$studentDetails.createdAt" },
					},
					totalStudents: { $sum: 1 },
					totalRevenue: { $sum: "$price" },
				},
			},
			{
				$sort: { "_id.year": 1, "_id.month": 1 },
			},
		]);

		const monthlyReport = courseData.map((entry) => ({
			month: moment().month(entry._id.month - 1).format("MMMM"), 
			year: entry._id.year,
			totalStudents: entry.totalStudents,
			totalRevenue: entry.totalRevenue,
		}));

		const totalStudents = monthlyReport.reduce((acc, entry) => acc + entry.totalStudents, 0);
		const totalRevenue = monthlyReport.reduce((acc, entry) => acc + entry.totalRevenue, 0);

		// Send response
		res.status(200).json({
			success: true,
			message: "Month-wise student and revenue report generated",
			data: {
				students,
				monthlyReport,
				totalStudents,
				totalRevenue,
			},
		});
	} catch (error) {
		console.error("Error generating report:", error);
		return res.status(500).json({
			success: false,
			message: "Internal Server Error: " + error.message,
		});
	}
};


