import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CoursesTable from './CoursesTable'
import toast from 'react-hot-toast'
import axios from 'axios'

const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.get("/api/courses/getInstructorCourses",
            null,
            {
                Authorisation: `Bearer ${token}`,
            }
        );
        console.log("INSTRUCTOR COURSES API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses");
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};
const MyCourses = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.user);
    const [courses, setCourses] = useState(null);
    const fetchedCourses = async () => {
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result);
        }
    }

    useEffect(() => {
        fetchedCourses();
    }, [])
    return (
        <div className='mx-auto w-11/12 max-w-[1100px] py-10'>
            <div>
                <div className='mb-14 flex items-center justify-between'>
                    <h1 className='text-3xl font-medium text-richblack-5' ></h1>
                    <button onClick={() => { navigate('/dashboard/addcourse') }} className='flex items-center bg-black cursor-pointer gap-x-2 rounded-md py-2 px-2 md:px-5 font-semibold text-white undefined'>
                        <p>Add Course</p>
                    </button>
                </div>
                <div>
                    {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
                </div>
            </div>
        </div>
    )
}

export default MyCourses