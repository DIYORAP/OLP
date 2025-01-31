import React from 'react'
import { Outlet } from 'react-router';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../redux/Slice/viewCourseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import ReviewModal from '../pages/ReviewModal';
import toast from 'react-hot-toast';
import axios from 'axios';
import VideoDetailsSidebar from './VideoDetailsSidebar';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false)
    const { courseId } = useParams();
    const { token } = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();


    // 
    const getFullDetailsOfCourse = async (courseId, token) => {
        const toastId = toast.loading("Loading...");
        let result = null;

        try {
            console.log("Sending courseId to API:", courseId, token); // Debugging

            const response = await axios.post("/api/courses/getFullCourseDetails",
                { courseId },
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
            result = error.response?.data || { message: "Something went wrong!" };
        }

        toast.dismiss(toastId);
        return result;
    };


    useEffect(() => {
        const setCourseSpecifics = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            var lecture = 0;
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lecture += section?.SubSection?.length;
            });
            dispatch(setTotalNoOfLectures(lecture));
        }
        setCourseSpecifics();
    }, [courseId, token, dispatch]);

    return (

        <div className=' flex w-screen'>
            <div className=''>
                <VideoDetailsSidebar setReviewModal={setReviewModal} />
            </div>
            <div>
                <Outlet />
            </div>
            {
                reviewModal && <ReviewModal setReviewModal={setReviewModal} />
            }
        </div>
    )
}

export default ViewCourse