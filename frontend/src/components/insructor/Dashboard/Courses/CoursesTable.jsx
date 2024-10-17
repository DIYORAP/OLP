import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { COURSE_STATUS } from '@/utils/constants';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import { formatDate } from '@/utils/FormateDate';


export default function CoursesTable({ courses, setCourses }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.user);
    const [confirmationModal, setConfirmationModal] = useState(null);








    const fetchInstructorCourses = async (token) => {
        let result = [];
        const toastId = toast.loading("Loading...");
        try {
            const response = await axios.post("/api/courses/getInstructorCourses",
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


    const handleCourse = async (courseId) => {
        setLoading(true)
        //  await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }


    if (loading) {
        return (
            <div className="custom-loader"></div>
        )
    }

    return (
        <>

            <Table className="rounded-xl border border-richblack-800 ">
                <Thead >
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 text-black">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-black">
                            created courses
                        </Th>

                    </Tr>
                </Thead>
                <Tbody>
                    {courses?.length === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                No courses found
                                {/* TODO: Need to change this state */}
                            </Td>
                        </Tr>
                    ) : (
                        courses?.map((course) => (
                            <Tr
                                key={course?._id}
                                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8 gap-4"
                            >
                                <Td colSpan={1} className="flex flex-1 gap-x-4 p-1">
                                    <img
                                        src={course?.thumbnail}
                                        alt={course?.title}
                                        className="md:h-[200px] md:w-[300px] aspect-video rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col gap-1 justify-between">
                                        <p className="text-lg font-bold text-richblack-5 mt-3">
                                            {course.title}
                                        </p>
                                        <p className="text-xs text-richblack-300">
                                            {course?.description.split(" ")?.length >
                                                50
                                                ? course.description
                                                    .split(" ")
                                                    .slice(0, 50)
                                                    .join(" ") + "..."
                                                : course.description}
                                        </p>
                                        <p className="font-bold text-blue-950">
                                            Created: {formatDate(course?.createdAt || course?.updatedAt)}
                                        </p>
                                        {/* {course.status === COURSE_STATUS.DRAFT ? (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                <HiClock size={14} />
                                                Drafted
                                            </p>
                                        ) : (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-800 text-richblack-700">
                                                    <FaCheck size={8} />
                                                </div>
                                                Published
                                            </p>
                                        )} */}
                                    </div>
                                </Td>
                                {/* <Td className="text-sm font-medium text-richblack-100">
                  6hr 30min
                </Td> */}
                                <Td className="text-2xl font-medium text-black  mt-40">
                                    ₹{course.price}
                                </Td>
                                <Td className="text-sm font-medium text-richblack-100 ">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            navigate(`/dashboard/edit-course/${course._id}`);
                                        }}
                                        title="Edit"
                                        className="px-5 py-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 bg-black text-white rounded-md mr-6 mt-40"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2:
                                                    "All the data related to this course will be deleted",
                                                btn1Text: !loading ? "Delete" : "Loading...  ",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading
                                                    ? () => handleCourseDelete(course._id)
                                                    : () => { },
                                                btn2Handler: !loading
                                                    ? () => setConfirmationModal(null)
                                                    : () => { },
                                            })
                                        }}
                                        title="Delete"
                                        className="px-5 py-2 bg-black rounded-md hover:bg-[#ff0000] text-white transition-all duration-200 hover:scale-110 hover:text-[#000000]"
                                    >
                                        Delete
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>

    )
}
