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

            const response = await fetch("/api/profile/deletecourse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete course");
            }

            setCourses((prev) => prev.filter((course) => course._id !== courseId));

            alert("Course deleted successfully!");
        } catch (error) {
            console.error("Error deleting course:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCSV = () => {
        if (!courses || courses.length === 0) {
            alert("No course data to export");
            return;
        }

        const headers = ["Title", "Instructor Email", "Enrolled Students", "Price (₹)", "Created At"];

        const rows = courses.map((course) => [
            course.title,
            course.instructor?.email || "Unknown",
            course.studentsEnrolled?.length || 0,
            `₹${course.price}`,
            new Date(course.createdAt || course.updatedAt).toLocaleDateString(),
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(","))
            .join("\n");

        const utf8Bom = "\uFEFF"; // Ensure ₹ renders correctly in Excel
        const blob = new Blob([utf8Bom + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "courses.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="p-6 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">All Courses</h2>
                <button
                    onClick={handleDownloadCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all duration-200"
                >
                    Download CSV
                </button>
            </div>


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
                                            handleCourseDelete(course._id)
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
