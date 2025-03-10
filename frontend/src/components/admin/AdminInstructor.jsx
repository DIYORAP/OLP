import React, { useEffect, useState } from "react";

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
    console.log(instructors)
    const handleInstructorDelete = async (instructorId) => {
        try {
            setLoading(true);
            await fetch(`/api/admin/instructors/${instructorId}`, { method: "DELETE" });
            setInstructors((prev) => prev.filter((instructor) => instructor._id !== instructorId));
        } catch (error) {
            console.error("Error deleting instructor:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-xl font-bold text-black mb-6">All Instructors</h2>

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
