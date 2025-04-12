import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const InstructorList = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/admin/instructors");
                const data = await response.json();
                if (data.success) {
                    setInstructors(data.data);
                }
            } catch (error) {
                console.error("Error fetching instructors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInstructors();
    }, []);

    const handleInstructorDelete = async (instructorId) => {
        try {
            setLoading(true);

            const response = await axios.post("/api/profile/delete", {
                studentId: instructorId,
            });

            if (response.data.success) {
                setInstructors((prev) => prev.filter((ins) => ins._id !== instructorId));
                toast.success("Instructor Deleted Successfully");
            } else {
                throw new Error(response.data.message || "Failed to delete instructor");
            }
        } catch (error) {
            console.error("Error deleting instructor:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCSV = () => {
        if (!instructors || instructors.length === 0) {
            alert("No instructor data to export");
            return;
        }

        const headers = ["Username", "Email", "Courses", "Prices", "Total Students"];

        const rows = instructors.map((instructor) => {
            const courseTitles = instructor.courses.map((c) => c.title).join(" | ");
            const coursePrices = instructor.courses.map((c) => `₹${c.price}`).join(" | ");
            const totalStudents = instructor.courses
                .map((c) => c.studentsEnrolled?.length || 0)
                .reduce((a, b) => a + b, 0);

            return [instructor.username, instructor.email, courseTitles, coursePrices, totalStudents];
        });

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(","))
            .join("\n");

        const utf8Bom = "\uFEFF";
        const blob = new Blob([utf8Bom + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "instructors.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="p-6 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">All Instructors</h2>
                <button
                    onClick={handleDownloadCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Download CSV
                </button>
            </div>

            {instructors.length === 0 ? (
                <p className="text-sm font-medium text-gray-400">No instructors found</p>
            ) : (
                <table className="w-full border-collapse">
                    <tbody>
                        {instructors.map((instructor) => (
                            <tr key={instructor._id} className="flex gap-x-10 border-b border-gray-700 px-6 py-8">
                                <td className="flex flex-1 gap-x-4 p-1">
                                    <img
                                        src={instructor.profilePic || "/default-avatar.png"}
                                        alt="Profile"
                                        className="h-12 w-12 rounded-full object-cover border border-gray-300"
                                    />

                                    <div className="flex flex-col gap-2 justify-between">
                                        <p className="text-lg font-bold text-black mt-3">{instructor.username}</p>
                                        <p className="text-sm text-gray-700">Email: {instructor.email}</p>

                                        <p className="text-sm font-medium text-gray-900">Created Courses:</p>
                                        {instructor.courses.length > 0 ? (
                                            instructor.courses.map((course) => (
                                                <div key={course._id} className="flex gap-3 mt-2">
                                                    <img
                                                        src={course.thumbnail}
                                                        alt={course.title}
                                                        className="h-16 w-24 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-black">{course.title}</p>
                                                        <p className="text-xs font-medium text-green-600">₹{course.price}</p>
                                                        <p className="text-xs text-gray-500">
                                                            Students Enrolled: {course.studentsEnrolled?.length || 0}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">No created courses</p>
                                        )}
                                    </div>
                                </td>

                                <td className="text-sm font-medium text-black">
                                    <button
                                        disabled={loading}
                                        onClick={() => handleInstructorDelete(instructor._id)}
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

export default InstructorList;
