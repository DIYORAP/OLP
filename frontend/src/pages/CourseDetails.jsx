import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { FaShareSquare } from 'react-icons/fa';
import { IoVideocamOutline } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { ACCOUNT_TYPE } from '@/utils/constants';
import { Button } from '@/components/ui/button';

const CourseDetails = () => {
    const { token } = useSelector((state) => state.user);
    // const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
    // const { cart } = useSelector((state) => state.cart);

    const fetchCourseDetails = async (courseId, dispatch) => {
        // const toastId = toast.loading("Loading...")
        //  dispatch(setProgress(50));
        let result = null;
        try {
            const response = await axios.post("/api/courses/getCourseDetails", {
                courseId,
            });
            console.log("COURSE_DETAILS_API API RESPONSE............", response.data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result = response.data.data[0];
        } catch (error) {
            console.log("COURSE_DETAILS_API API ERROR............", error);
            result = error.response.data;
            // toast.error(error.response.data.message);
        }
        // toast.dismiss(toastId)
        // dispatch(setProgress(100));
        //   dispatch(setLoading(false));
        return result;
    };

    const handelPayment = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
        }
        else {
            navigate('/login');
        }
    }

    useEffect(() => {
        const getCourseDetails = async () => {
            const response = await fetchCourseDetails(courseId, dispatch);
            // console.log("getCourseDetails -> response", response);
            setCourseDetail(response);
        }
        getCourseDetails();
    }, [courseId]);

    // useEffect(() => {
    //     if (courseDetail?.ratingAndReviews?.length > 0) {
    //         const count = GetAvgRating(courseDetail?.ratingAndReviews);
    //         setAvgReviewCount(count);
    //         console.log("getCourseDetails -> count", parseInt(count));
    //     }
    // }, [courseDetail?.ratingAndReviews]);


    //add to cart
    // const handelAddToCart = () => {
    //     if (token) {
    //         dispatch(addToCart(courseDetail));
    //         // console.log("handelAddToCart -> courseId", courseDetail._id)
    //     }
    //     else {
    //         navigate('/login');
    //     }
    // }


    // useEffect(() => {
    //     if (courseDetail) {
    //         const Enrolled = courseDetail?.studentsEnrolled?.find((student) => student === user?._id);
    //         // console.log("CourseDetails -> Enrolled", Enrolled)
    //         if (Enrolled) {
    //             setAlreadyEnrolled(true);
    //         }
    //     }
    // }, [courseDetail, user?._id])





    if (!courseDetail) return <div className='flex justify-center items-center h-screen'>
        <div className='custom-loader'></div>
    </div>

    return (
        <div>
            <div className='mx-auto box-content px-4 lg:w-[1260px] lg:relative '>
                <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                    <div className='relative block max-h-[30rem] lg:hidden'>
                        <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]'></div>
                        <img src={courseDetail?.thumbnail} alt="course img" />
                    </div>
                    <div className='z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5'>
                        <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{courseDetail?.title}</p>
                        <p className='text-richblack-200'>{courseDetail?.description}</p>
                        {/* <div className='flex gap-x-3 items-center'> */}
                        {/* <span className='text-black-50'>{avgReviewCount || 0}</span> */}
                        {/* <RatingStars Review_Count={avgReviewCount} /> */}
                        {/* <span className=' md:block hidden md:text-xl text-richblack-5'>({courseDetail?.ratingAndReviews?.length} Reviews)</span> */}
                        {/* student enrolled */}
                        {/* <span className='text-richblack-200'>{courseDetail?.studentsEnrolled?.length} students enrolled</span> */}
                        {/* </div> */}
                        <div>
                            <p>Created By {courseDetail?.instructor?.username} </p>
                        </div>
                        <div className='flex flex-wrap gap-5 text-lg'>
                            <AiOutlineInfoCircle className='text-2xl text-richblack-5' />
                            <p className='text-black'>Created at &nbsp;
                                {new Date(courseDetail?.createdAt || courseDetail?.updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                            <p className='flex items-center gap-2 text-black'><BsGlobe className='text-lg text-black' />English</p>
                        </div>
                    </div>
                    <div className='flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden'>
                        <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>
                            <span>₹{courseDetail?.price}</span></p>
                        {ACCOUNT_TYPE.INSTRUCTOR !== token?.role &&
                            <>
                                {
                                    alreadyEnrolled ? <button onClick={() => { navigate("/dashboard/enrolled-courses") }} className='yellowButton'>Go to Course</button> : <button onClick={handelPayment} className='yellowButton'>Buy Now</button>
                                }

                            </>
                        }
                    </div>
                </div>
                <div className='right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block'>
                    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
                        <img src={courseDetail?.thumbnail} alt="course img" className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full' />
                        <div className='px-4'>
                            <div className='space-x-3 pb-4 text-3xl font-semibold'>
                                <span>₹{courseDetail?.price}</span>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Button>Buy Now</Button>
                            </div>

                            <div className='text-center'>
                                {/* copy url */}
                                <button className='mx-auto flex items-center gap-2 py-6 text-black-100' onClick={
                                    () => {
                                        navigator.clipboard.writeText(window.location.href);
                                        toast.success('URL copied to clipboard');
                                    }
                                }>
                                    <FaShareSquare className='text-xl text-black' />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                    <div className='my-8 border border-richblack-600 p-8'>
                        <p className='text-3xl font-semibold'>
                            What you'll learn
                        </p>
                        <div className='mt-5'>
                            {
                                courseDetail?.whatYouWillLearn
                            }
                        </div>
                    </div>
                    <div className='max-w-[830px] '>
                        <div className='flex flex-col gap-3'>
                            <p className='text-[28px] font-semibold'>Course Content</p>
                            <div className='flex flex-wrap justify-between gap-2'>
                                <div className='flex gap-2'>
                                    <span>{courseDetail?.courseContent?.length} Section(s)</span>
                                    <span>{courseDetail?.courseContent?.reduce((acc, item) => acc + item?.SubSection?.length, 0)} Lecture(s)</span>
                                </div>

                            </div>
                        </div>
                        <div className='py-4'>
                            {
                                courseDetail?.courseContent?.map((item, index) => (
                                    <details key={index} className=' border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 detailanimatation'>
                                        <summary className='flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-5 transition-[0.3s]'>
                                            <div className='flex items-center gap-2'>
                                                <FaChevronDown className='arrow ' />
                                                <span className='text-xl'>{item?.sectionName}</span>
                                            </div>
                                            <div className='space-x-4'>
                                                <span className='text-black'>{item?.SubSection?.length} Lecture(s)</span>
                                            </div>
                                        </summary>

                                        {/* baki che thodu */}
                                        {/* <div className='mt-5'>
                                            {
                                                item?.SubSection?.map((subItem, subIndex) => (
                                                    <div key={subIndex} className='relative overflow-hidden bg-richblack-900  p-5 border border-solid border-richblack-600'>
                                                        <div className='flex items-center gap-2'>
                                                            <IoVideocamOutline className='txt-lg text-richblack-5' />
                                                            <span className='text-lg'>{subItem?.title}</span>
                                                        </div>
                                                    </div>

                                                ))
                                            }
                                        </div> */}
                                    </details>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='mb-12 py-4'>
                </div>
                <p className='text-[28px] font-semibold'>
                    Author
                </p>
                <div className='flex items-center gap-4 py-4'>
                    <img src={courseDetail?.instructor.profilePic} alt="author img" className='w-[50px] h-[50px] rounded-full object-cover' />
                    <p className='text-xl font-semibold'>{courseDetail?.instructor?.username}</p>
                </div>
            </div>

            <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[990px]'>
                    <div className='my-8 border border-richblack-600 p-3 md:p-8'>
                        <p className='text-3xl font-semibold'>
                            Reviews
                        </p>
                        <div className='mt-5'>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-4xl font-semibold'>{avgReviewCount}</span>
                                    <span className='text-2xl'>/5</span>
                                    <span className='text-black'>({courseDetail?.ratingAndReviews?.length} ratings)</span>
                                    <span className='text-black'>|</span>
                                    <span className='text-black'> {courseDetail?.studentsEnrolled?.length} students</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CourseDetails