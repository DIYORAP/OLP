import Section from "../model/Section.model.js";
import Course from "../model/Course.model.js";

export const createSection = async (req, res, next) => {
    try {
        const { sectionName, courseId } = req.body;

        // Validate input
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing required properties",
            });
        }

        // Check if the course exists
        const course = await Course.findById(courseId);
        console.log( "course id",course);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Create a new section
        const newSection = await Section.create({ sectionName });
   console.log("new sees",newSection);
        // Update the course to include the new section
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const upadteSection=async(req,res,next)=>{
    try {
           const {sectionName,sectionId,courseId} =req.body;
           console.log(sectionName,sectionId);


           const section =await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName
            },
            {
                new:true
            }
           );

           const updatedCourse =await Course.findById(courseId).populate({path:"courseContent",populate:{path:"subSection"}}).exec();
           res.status(200).json({
            success:true,
            message:"Section updated SuccessFully",
            upadteSection,
           })
    } catch (error) {
        console.error("Error updating section :",error);
        res.status(500).json({
            success:false,
            message:"Internal server Error",
        });  
    }
}

export const deleteSection =async(req,res,next)=>{
    try {
         const {sectionId,courseId} =req.body;
         await Section.findByIdAndDelete(sectionId);

         const updatedCourse=await Course.findById(courseId).populate({path:"courseContent",populate:{path:"subSection"}}).exec();

         res.status(200).json({
            success:true,
            message:"Section deleted",
            upadteSection,
         })
    } catch (error) {
         console.error("Error deleting section",error);
         res.status(500).json({
            success:false,
            message:"deleting error for server errirn "
         })
    }
}