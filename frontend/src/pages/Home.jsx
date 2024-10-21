import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported from 'react-router-dom'

export default function Home() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses/cou');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <>
            <h2 className='section_heading mb-6 md:text-3xl text-xl m-3 ml-48'>
                Most Popular Courses
            </h2>
            <div className="mx-auto mt-3 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 p-10">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div
                            key={course._id}
                            className="mb-4 hover:scale-[1.03] transition-all duration-200 z-50 border-blue-950 border-[1px] rounded-md"
                        >
                            <Link key={course._id} to={`/courses/${course._id}`} className="block mb-8">
                                <article key={course.id} className="flex max-w-xl flex-col items-start justify-between">
                                    <div className="items-center gap-x-4 text-xs">
                                        <div
                                            className=" w-full overflow-hidden object-cover"
                                        >
                                            <div>
                                                <img
                                                    src={
                                                        course.thumbnail || "https://imagedelivery.net/ePR8PyKf84wPHx7_RYmEag/44e22ad8-8e5f-4b66-1201-f30c4fa64c00/58"
                                                    }
                                                    alt="Course thumbnail"
                                                    className="md:h-[270px] md:w-[457px] aspect-video rounded-md object-cover"
                                                />
                                            </div>
                                        </div>
                                        <time dateTime={course.date} className="text-gray-500">
                                            {course.date}
                                        </time>
                                        <a
                                            href={course.category}
                                            className="relative z-10 rounded-full bg-black px-3 py-1.5 font-medium text-white hover:bg-gray-100 hover:text-black"
                                        >
                                            {course.category}
                                        </a>
                                    </div>

                                    <div className="flex flex-col gap-2 px-1 py-3">
                                        <p className="text-sm md:text-xl text-richblack-5">{course?.courseName}</p>
                                        <p className="text-[12px] md:text-xl text-richblack-5">
                                            By{' '}
                                            <span className="text-black">
                                                {course?.instructor?.username}
                                            </span>
                                        </p>
                                        <div className="flex gap-x-3">
                                            <span className="md:block hidden md:text-xl text-richblack-5">
                                                {course?.ratingAndReviews?.length} Ratings
                                            </span>
                                        </div>
                                        <p className="text-sm md:text-xl text-richblack-5">Rs. {course?.price}</p>
                                    </div>
                                </article>
                            </Link>
                        </div>
                    ))

                ) : (
                    <p>Loading courses...</p>
                )}
            </div>
        </>
    );
}
