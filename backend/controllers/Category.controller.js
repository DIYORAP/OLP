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


