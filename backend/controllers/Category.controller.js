import Category from "../model/Category.model";
import Course from "../model/Course.model";
import ErrorResponse from "../utils/ErrorResponse";


export const createCategory=async(req,res,next)=>{
    try {
         const {name,description} =req.body;

         if(!name){
            return next(new ErrorResponse('All fields are mandatory', 400));

         }
         const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});

        console.log(CategorysDetails);
        return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
    } catch (error) {
        return res.status(500).json({
			success: true,
			message: error.message,
		});
    }
}

export const showAllCategories=async(req,res,next)=>{
    try{
        const allCategorys=await Category.find({},
            {name:true,description:true}
        );

        res.status(200).json({success:true,data:allCategorys});

    }
 catch(error){
    return res.status(500).json({
        success:false,
        message:error.message,
    });
  }
};


export const addCourseToCategory=async(req,res)=>{
    const {courseId,categoryId}=req.body;
       try {
             const category=await Category.findById(categoryId);
             if(!category){
                return res.status(404).json({
                    success:false,
                    message:"Category not Found",
                });
             }

             const course=await Course.findById(courseId);
             if(!course){
                return res.status(404).json({
                    success:false,
                    message:"Course Not Found",
                });
             }

             if(category.courses.includes(courseId)){
                return res.status(200).json({
                    success: true,
                    message: "Course already exists in the category",
                });
             }
               category.courses.push(courseId);
		       await category.save();
		       return res.status(200).json({
			    success: true,
			    message: "Course added to category successfully",
		});
       } catch (error) {
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
       }
}

