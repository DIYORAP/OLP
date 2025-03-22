import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RatingStars from '@/components/common/RatingStar';
import GetAvgRating from '@/utils/getavragerating';

const Course_Card = ({ course, Height }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])



    return (
        <div className=' mb-4 bg-slate-300 rounded-xl  border border-black hover:scale-[1.03] transition-all duration-200 z-50 '>
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div>
                        <img
                            src={course?.thumbnail}
                            alt='course thumbnail'
                            className={`${Height}  rounded-xl object-cover`}
                        />
                    </div>
                    <div className='flex flex-col gap-2 px-1 py-3'>
                        <p className='text-sm md:text-xl text-richblack-5'>{course?.title}</p>
                        <p className='text-[12px] md:text-xl text-richblack-5'>By <span className='text-black'>{course?.instructor?.username}</span></p>
                        <div className='flex gap-x-3'>
                            <span className='text-black'>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className=' md:block hidden md:text-xl text-richblack-5'>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className='text-sm md:text-xl text-richblack-5'>Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>


        </div>
    )
}

export default Course_Card
