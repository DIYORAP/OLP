import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/admin/students");
                const data = await response.json();
                console.log(data);
                if (data.success) {
                    setStudents(data.data);
                } else {
                    console.error("Failed to fetch students:", data.message);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleStudentDelete = async (studentId) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/profile/delete", { studentId });

            if (response.data.success) {
                setStudents((prev) => prev.filter((student) => student._id !== studentId));
                toast.success("Student deleted successfully");
            } else {
                throw new Error(response.data.message || "Failed to delete student");
            }
        } catch (error) {
            console.error("Error deleting student:", error);
            alert(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCSV = () => {
        if (!students || students.length === 0) {
            alert("No student data to export");
            return;
        }

        const headers = ["Username", "Email", "Courses", "Instructors", "Prices"];

        const rows = students.map((student) => {
            const courseTitles = student.courses.map((c) => c.title).join(" | ");
            const instructors = student.courses.map((c) => c.instructor?.username || "Unknown").join(" | ");
            const prices = student.courses.map((c) => `₹${c.price}`).join(" | ");

            return [student.username, student.email, courseTitles, instructors, prices];
        });

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(","))
            .join("\n");
        const utf8Bom = "\uFEFF";
        const csvWithBom = utf8Bom + csvContent;

        const blob = new Blob([csvWithBom], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "students.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">All Students</h2>
                <button
                    onClick={handleDownloadCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Download CSV
                </button>
            </div>

            {loading ? (
                <p className="text-sm font-medium text-gray-400">Loading...</p>
            ) : students.length === 0 ? (
                <p className="text-sm font-medium text-gray-400">No students found</p>
            ) : (
                <table className="w-full border-collapse">
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="flex gap-x-10 border-b border-gray-700 px-6 py-8">
                                <td className="flex flex-1 gap-x-4 p-1">
                                    <div className="pt-6">
                                        <img
                                            src={student.profilePic || "/default-avatar.png"}
                                            alt="Profile"
                                            className="h-12 w-12 rounded-full object-cover border border-gray-300"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 justify-between">
                                        <p className="text-lg font-bold text-black mt-3">{student.username}</p>
                                        <p className="text-sm text-gray-700">Email: {student.email}</p>

                                        <p className="text-sm font-medium text-gray-900">Enrolled Courses:</p>
                                        {student.courses.length > 0 ? (
                                            student.courses.map((course) => (
                                                <div key={course._id} className="flex gap-3 mt-2">
                                                    <img
                                                        src={course.thumbnail}
                                                        alt={course.title}
                                                        className="h-16 w-24 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-black">{course.title}</p>
                                                        <p className="text-xs text-gray-500">
                                                            Instructor: {course.instructor?.username || "Unknown"}
                                                        </p>
                                                        <p className="text-xs font-medium text-green-600">₹{course.price}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">No enrolled courses</p>
                                        )}
                                    </div>
                                </td>

                                <td className="text-sm font-medium text-black">
                                    <button
                                        disabled={loading}
                                        onClick={() => handleStudentDelete(student._id)}
                                        className="px-5 py-2 bg-black rounded-md hover:bg-red-600 text-white transition-all duration-200 hover:scale-110 hover:text-black"
                                    >
                                        {loading ? "Deleting..." : "Delete"}
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

export default StudentList;
