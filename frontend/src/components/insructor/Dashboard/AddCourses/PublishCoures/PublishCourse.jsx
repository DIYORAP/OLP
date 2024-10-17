import { setCourse, setEditCourse, setStep } from '@/redux/Slice/courseSlice';
import { COURSE_STATUS } from '@/utils/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const PublishCourse = () => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const { token } = useSelector((state) => state.user);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();




    const editCourseDetails = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...");
        try {
            const response = await axios.post("/api/courses/editCourse", data, {
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            });
            console.log("EDIT COURSE API RESPONSE............", response);
            if (!response?.data?.success) {
                throw new Error("Could Not Update Course Details");
            }
            toast.success("Course Details Updated Successfully");
            result = response?.data?.data;
        } catch (error) {
            console.log("EDIT COURSE API ERROR............", error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        return result;
    };

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, []);

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToMyCourses = () => {
        navigate("/dashboard/mycourses");
    }

    const handelPublish = async () => {
        if ((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            goToMyCourses();
            setLoading(false);
            dispatch(setStep(1));
            dispatch(setEditCourse(null));
            return;
        }
        const formData = new FormData();
        formData.append("courseId", course._id);
        formData.append("status", getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT);
        const result = await editCourseDetails(formData, token);


        if (result) {
            dispatch(setStep(1));
            dispatch(setEditCourse(null));
            setLoading(false);
        }
        if (result) {
            goToMyCourses();
        } else {
            toast.error("Something went wrong");
        }

    }


    const onSubmit = (data) => {
        setLoading(true);
        handelPublish(data);
    }


    return (
        <div>
            <div className='rounded-md border-[1px] border-black  p-6'>
                <p className='text-2xl font-semibold text-richblack-5' >Publish Settings</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='my-6 mb-8'>
                        <label htmlFor="public" className="inline-flex items-center text-lg">
                            <input defaultChecked={false} type="checkbox" id="public" name="public" className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5" {...register("public")} />
                            <span className="ml-2 text-richblack-400">Make this course as public <span className='border-red-200 border-x-8 font-bold rounded-sm text-blue-900'>badhane batava mago cho</span> </span>
                        </label>
                    </div>
                    <div className="ml-auto flex max-w-max items-center gap-x-4">
                        <button disabled={loading} onClick={goBack} type="button" className="flex cursor-pointer items-center gap-x-2 rounded-md bg-white py-[8px] px-[20px] font-semibold ">Back</button>
                        <button disabled={loading} type='submit' className="flex items-center bg-black cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white undefined">Save Changes</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default PublishCourse;
