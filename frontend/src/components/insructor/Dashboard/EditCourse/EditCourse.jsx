import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import RenderSteps from '../AddCourses/RenderSteps';
import { setCourse, setEditCourse, setStep } from '@/redux/Slice/courseSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const EditCourse = () => {
    const { token } = useSelector((state) => state.user.currentUser);
    const { course } = useSelector((state) => state.course);
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const getFullDetailsOfCourse = async (courseId, token) => {
        const toastId = toast.loading("Loading...");
        //   dispatch(setLoading(true));
        let result = null;
        try {
            const response = await axios.post("/api/courses/getFullCourseDetails",
                {
                    courseId,
                },
                {
                    Authorisation: `Bearer ${token}`,
                }
            );
            console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result = response?.data?.data;
        } catch (error) {
            console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
            result = error.response.data;
            // toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        //   dispatch(setLoading(false));
        return result;
    };



    useEffect(() => {
        const popualteCourse = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if (result?.courseDetails) {
                dispatch(setCourse(result.courseDetails));
                console.log("result", course);
                dispatch(setEditCourse(true));
                dispatch(setStep(1));
            }
            setLoading(false);
        }
        popualteCourse();
    }, []);

    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Edit Course</h1>
            {
                loading ? <p>Loading...</p> : (
                    <RenderSteps />
                )
            }
        </div>
    )
}

export default EditCourse