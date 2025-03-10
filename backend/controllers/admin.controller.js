import Course from "../model/Course.model.js";
import User from "../model/User.model.js";
export const getAllCourses = async (req, res, next) => {
    try {
      const allCourses = await Course.find({}, {
        title: true,
        price: true,
        description:true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
        createdAt:true,
      })
      .populate("instructor", "name email") 
      .populate("studentsEnrolled", "name email")
      .exec();
  
      return res.status(200).json({
        success: true,
        data: allCourses,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        success: false,
        message: "Can't fetch course data",
        error: error.message,
      });
    }

  };

//   export const getAllStudents = async (req, res) => {
//     try {
//         const students = await User.find({ role: "Student" })
//             .populate({
//                 path: "courses",
//                 select: "title price thumbnail instructor",
//                 populate: {
//                     path: "instructor", 
//                     select: "name email",
//                 },
//             })
//             .exec();

//         return res.status(200).json({
//             success: true,
//             data: students,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Error fetching students",
//             error: error.message,
//         });
//     }
// };

export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "Student" })
            .populate("courses", "title price thumbnail instructor")
            .exec();

        return res.status(200).json({
            success: true,
            data: students,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching students",
            error: error.message,
        });
    }
};
