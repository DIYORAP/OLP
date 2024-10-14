import React, { useEffect, useState } from 'react'
import ChipInput from './TagInput';
import Upload from './Upload';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { TbCurrencyRupee } from "react-icons/tb";
//import RequirementField from './RequirementField';
import { Button } from '@/components/ui/button';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const categories = [
        { value: 'web-development', label: 'Web Development' },
        { value: 'devops', label: 'DevOps' },
        { value: 'ai-ml', label: 'AI & ML' },
        { value: 'cpp', label: 'C++' },
        { value: 'java', label: 'Java' },
        { value: 'dsa', label: 'DSA' },
        { value: 'computer-networks', label: 'Computer Networks' },
    ];

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {


        if (editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            // setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }


    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category ||
            currentValues.courseImage !== course.thumbnail)
            //    currentValues.courseRequirements.toString() !== course.instructions.toString())
            return true;
        else
            return false;
    }

    //handles next button click 
    const onSubmit = async (data) => {

        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }


                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    dispatch(setEditCourse(false));
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else {
                toast.error("NO Changes made so far");
            }
            console.log("PRINTING FORMDATA", formData);
            console.log("PRINTING result", result);

            return;
        }

        //create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        // formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("thumbnailImage", data.courseImage);

        setLoading(true);
        console.log("BEFORE add course API call");
        console.log("PRINTING FORMDATA", formData);
        const result = await addCourseDetails(formData, token);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("AFTER add course API call");
        console.log("PRINTING FORMDATA", [...formData]);
        console.log("PRINTING result", result);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 rounded-md border-[1px] border-black bg-richblack-800 p-6'>
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-black' htmlFor='courseTitle'>Course Title<sup className='text-red-500'>*</sup></label>
                <input
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register("courseTitle", { required: true })}
                    className={`form-style w-full ${errors.courseTitle ? 'border-red-500' : 'border-richblack-50'}`}
                />
                {errors.courseTitle && (
                    <span className='ml-2 text-xs tracking-wide text-red-500'>Course Title is Required**</span>
                )}
            </div>

            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-black' htmlFor='courseShortDesc'>Course Short Description<sup className='text-red-500'>*</sup></label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter Description'
                    {...register("courseShortDesc", { required: true })}
                    className={`form-style resize-x-none min-h-[130px] w-full ${errors.courseShortDesc ? 'border-red-500' : 'border-richblack-50'}`}
                />
                {errors.courseShortDesc && (
                    <span className='ml-2 text-xs tracking-wide text-red-500'>Course Description is required*</span>
                )}
            </div>

            <div className='relative flex flex-col space-y-2'>
                <label className='text-sm text-black' htmlFor='coursePrice'>Course Price<sup className='text-red-500'>*</sup></label>
                <input
                    id='coursePrice'
                    placeholder='Enter Course Price'
                    {...register("coursePrice", { required: true, valueAsNumber: true })}
                    className={`form-style w-full !pl-12 ${errors.coursePrice ? 'border-red-500' : 'border-richblack-50'}`}
                />
                <TbCurrencyRupee size={30} className='absolute top-7' />
                {errors.coursePrice && (
                    <span className='ml-2 text-xs tracking-wide text-red-500'>Course Price is Required**</span>
                )}
            </div>

            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-black' htmlFor='courseCategory'>Course Category<sup className='text-red-500'>*</sup></label>
                <select disabled={editCourse} className={`form-style w-full ${errors.courseCategory ? 'border-red-500' : 'border-richblack-50'}`}
                    id='courseCategory'
                    defaultValue=""
                    {...register("courseCategory", { required: true })}
                >
                    <option value="" disabled>Choose a Category</option>
                    {categories.map(category => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
                {errors.courseCategory && (
                    <span className='ml-2 text-xs tracking-wide text-red-500'>Course Category is Required</span>
                )}
            </div>

            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <Upload
                name={"courseImage"}
                label={"Course Image"}
                register={register}
                errors={errors}
                setValue={setValue}
            />

            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-black'>Benefits of the course<sup className='text-red-500'>*</sup></label>
                <textarea
                    id='coursebenefits'
                    placeholder='Enter Benefits of the course'
                    {...register("courseBenefits", { required: true })}
                    className={`form-style resize-x-none min-h-[130px] w-full ${errors.courseBenefits ? 'border-red-500' : 'border-richblack-50'}`}
                />
                {errors.courseBenefits && (
                    <span className='ml-2 text-xs tracking-wide text-red-500'>Benefits of the course are required**</span>
                )}
            </div>

            {/* <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            /> */}
            <div className='flex justify-end gap-x-2'>
                {editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        className='text-[10px] md:text-sm p-2 px-1 font-semibold rounded-md flex items-center gap-x-2 bg-richblack-300'
                    >
                        Continue Without Saving
                    </button>
                )}
                <Button type="submit">
                    {!editCourse ? "Next" : "Save Changes"}
                </Button>
            </div>
        </form>
    )
}

export default CourseInformationForm;
