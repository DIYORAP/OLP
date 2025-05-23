import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from '@ramonak/react-progress-bar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { setProgress } from '@/redux/Slice/loadingBarSlice';
import toast from 'react-hot-toast';
const EnrolledCourses = () => {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.user?.currentUser?.token);

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const getUserEnrolledCourses = async (token, dispatch) => {
        dispatch(setProgress(0)); // Ensure progress is set correctly at start
        let result = [];

        try {
            console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");

            const response = await axios.get("/api/profile/getEnrolledCourses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            result = response.data.data;
            console.log("GET_USER_ENROLLED_COURSES_API RESPONSE:", result);
        } catch (error) {
            console.error("GET_USER_ENROLLED_COURSES_API ERROR:", error);
            toast.error("Could Not Get Enrolled Courses");
        }

        dispatch(setProgress(100)); // Ensure progress is completed
        return result;
    };

    const getEnrolledCourses = async () => {
        setLoading(true);
        const response = await getUserEnrolledCourses(token, dispatch);
        console.log("getEnrolledCourses -> response", response?.courseProgress);
        setLoading(false);
        setEnrolledCourses(response?.courses);
        setProgressData(response?.courseProgress);

    }




    const totalNoOfLectures = (course) => {
        let total = 0;
        course.courseContent.forEach((Section) => {
            total += Section.SubSection?.length;
        });
        return total;
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    if (Loading) {
        return (
            <div className='flex h-[calc(100vh)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-richblack-500'></div>
            </div>
        )
    }


    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>

            <div className='text-3xl text-richblack-50'>Enrolled Courses</div>
            {
                !enrolledCourses ? (<div>
                    Loading...
                </div>)
                    : !enrolledCourses.length ? (<p className='grid h-[10vh] w-full place-content-center text-black'>You have not enrolled in any course yet</p>)
                        : (
                            <div className='my-8 black'>
                                <div className='flex rounded-t-lg border-2 bbg-richblack-700 '>
                                    <p className='w-[45%] px-5 py-3'>Course Name</p>
                                    <p className='w-1/4 px-2 py-3'></p>
                                    <p className='flex-1 px-2 py-3'>Progress</p>
                                </div>
                                {/* card start */}
                                {
                                    enrolledCourses.map((course, index) => (
                                        <div key={index} onClick={() => {
                                            navigate(`view-course/${course._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].SubSection[0]}`)
                                        }}
                                            className='flex items-center border border-richblack-700 rounded-none'>
                                            <div className='flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3'>
                                                <img className='h-14 w-14 rounded-lg object-cover' src={course.thumbnail} />
                                                <div className='flex max-w-xs flex-col gap-2'>
                                                    <p className='font-semibold '>{course.title}</p>
                                                    <p className='text-xs text-richblack-300 hidden md:block'>{
                                                        //description with max 50 characters
                                                        course.description.length > 50 ? course.description.slice(0, 50) + '....' : course.description
                                                    }</p>
                                                </div>
                                            </div>

                                            <div className='w-1/4 px-2 py-3'>
                                                {/* {course?.totalDuration} */}
                                            </div>

                                            <div className='flex w-1/5 flex-col gap-2 px- py-3'>
                                                {
                                                    progressData?.map((progress, index) => {
                                                        //show 0 progress if no progress data is available
                                                        if (progress?.courseID === course?._id) {
                                                            return (
                                                                <div key={index}>
                                                                    <p>Completed: {progress?.completedVideos?.length} / {totalNoOfLectures(course)}</p>
                                                                    <ProgressBar
                                                                        completed={progress?.completedVideos?.length / totalNoOfLectures(course) * 100}
                                                                        total={progress?.total}
                                                                        height='8px'
                                                                        bgColor='green'
                                                                        isLabelVisible={false}
                                                                    />
                                                                </div>
                                                            )
                                                        }
                                                        return null;
                                                    }
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
            }

        </div>
    )
}

export default EnrolledCourses
