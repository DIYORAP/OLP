import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/admin/courses");
                const data = await response.json();
                if (data.success) {
                    setCourses(data.data);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseDelete = async (courseId) => {
        try {
            setLoading(true);
            await fetch(`/api/courses/${courseId}`, { method: "DELETE" });
            setCourses((prev) => prev.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error("Error deleting course:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-xl font-bold text-black mb-6">All Courses</h2>

            {courses?.length === 0 ? (
                <p className="text-sm font-medium text-gray-400">No courses available</p>
            ) : (
                <table className="w-full border-collapse">
                    <tbody>
                        {courses.map((course) => (
                            <tr
                                key={course._id}
                                className="flex gap-x-10 border-b border-gray-700 px-6 py-8"
                            >
                                <td colSpan={1} className="flex flex-1 gap-x-4 p-1">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="md:h-[200px] md:w-[300px] aspect-video rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col gap-2 justify-between">
                                        <p className="text-lg font-bold text-black mt-3">
                                            {course.title}
                                        </p>

                                        <p className="text-sm text-gray-700">
                                            Instructor:{" "}
                                            <span className="font-medium">
                                                {course.instructor?.email || "Unknown"}
                                            </span>
                                        </p>

                                        <p className="text-sm text-gray-700">
                                            Students Enrolled:{" "}
                                            <span className="font-medium">
                                                {course.studentsEnrolled?.length || 0}
                                            </span>
                                        </p>

                                        <p className="text-xs text-black">
                                            {course.description?.length > 50
                                                ? course.description.split(" ").slice(0, 50).join(" ") + "..."
                                                : course.description}
                                        </p>

                                        <p className="font-bold text-black">
                                            Created: {new Date(course.createdAt || course.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </td>

                                <td className="text-2xl font-medium text-black mt-40">
                                    ₹{course.price}
                                </td>

                                <td className="text-sm font-medium text-black">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                        }}
                                        className="px-5 py-2 bg-black rounded-md hover:bg-red-600 text-white transition-all duration-200 hover:scale-110 hover:text-black"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CourseList;
