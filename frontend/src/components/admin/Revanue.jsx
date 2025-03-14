// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import toast from "react-hot-toast";
// import DashboardChart from "@/pages/DashboardChart";

// const Revenue = () => {
//     const [details, setDetails] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [currentChart, setCurrentChart] = useState("revenue");
//     const { token, username } = useSelector((state) => state.user.currentUser);

//     const fetchInstructorCourses = async () => {
//         const toastId = toast.loading("Loading...");
//         try {
//             const response = await axios.get("/api/profile/getadmincourse", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (!response?.data?.success) throw new Error("Could Not Fetch Instructor Courses");
//             setCourses(response.data.data);
//         } catch (error) {
//             toast.error(error.message);
//         }
//         toast.dismiss(toastId);
//     };

//     const getInstructorDashboard = async () => {
//         const toastId = toast.loading("Loading...");
//         try {
//             const response = await axios.get("/api/profile/getadmin", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             console.log(response)
//             if (!response.data.success) throw new Error(response.data.message);
//             setDetails(response.data.data);
//         } catch (error) {
//             toast.error("Could Not Get Instructor Dashboard");
//         }
//         toast.dismiss(toastId);
//     };

//     useEffect(() => {
//         fetchInstructorCourses();
//         getInstructorDashboard();
//     }, []);

//     const totalEarnings = details?.reduce((acc, course) => acc + course?.totalRevenue, 0);
//     const totalStudents = details?.reduce((acc, course) => acc + course?.totalStudents, 0);

//     return (
//         <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
//             <div className='space-y-2'>
//                 <h1 className='text-2xl font-bold text-richblack-5'>Hi {username} 👋</h1>
//                 <p className='font-medium text-richblack-200'>Let's start something new</p>
//             </div>
//             <div className='my-4 flex flex-col-reverse gap-3 md:flex-row md:h-[450px] md:space-x-4'>
//                 <div className='flex flex-col flex-1 rounded-md bg-richblack-800 p-6'>
//                     <div className='flex items-center justify-between'>
//                         <p className='text-lg font-bold text-richblack-5'>Visualize</p>
//                         <div className='flex items-center space-x-4'>
//                             <button onClick={() => setCurrentChart('revenue')} className={`px-2 py-2 rounded-md ${currentChart === 'revenue' ? 'bg-richblack-900 text-black' : 'bg-richblack-800 text-richblack-100'}`}>Revenue</button>
//                             <button onClick={() => setCurrentChart('students')} className={`px-2 py-2 rounded-md ${currentChart === 'students' ? 'bg-richblack-900 text-black' : 'bg-richblack-800 text-richblack-100'}`}>Students</button>
//                         </div>
//                     </div>
//                     <DashboardChart details={details} currentChart={currentChart} />
//                 </div>
//                 <div className='flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6'>
//                     <p className='text-lg font-bold text-richblack-5'>Statistics</p>
//                     <div className='mt-4 space-y-4'>
//                         <div>
//                             <p className='text-lg text-richblack-200'>Total Courses</p>
//                             <p className='text-3xl font-semibold text-richblack-50'>{courses?.length}</p>
//                         </div>
//                         <div>
//                             <p className='text-lg text-richblack-200'>Total Students</p>
//                             <p className='text-3xl font-semibold text-richblack-50'>{totalStudents}</p>
//                         </div>
//                         <div>
//                             <p className='text-lg text-richblack-200'>Total Earnings</p>
//                             <p className='text-3xl font-semibold text-richblack-50'>₹ {totalEarnings}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Revenue;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import DashboardChart from "@/pages/DashboardChart";

const Revenue = () => {
    const [details, setDetails] = useState([]); // ✅ Default empty array
    const [courses, setCourses] = useState([]);
    const [currentChart, setCurrentChart] = useState("revenue");
    const { token, username } = useSelector((state) => state.user.currentUser);

    const fetchInstructorCourses = async () => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await axios.get("/api/profile/getadmincourse", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response?.data?.success) throw new Error("Could Not Fetch Instructor Courses");
            setCourses(response.data.data || []); // ✅ Ensure array
        } catch (error) {
            toast.error(error.message);
        }
        toast.dismiss(toastId);
    };

    const getInstructorDashboard = async () => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await axios.get("/api/profile/getadmin", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.data.success) throw new Error(response.data.message);
            setDetails(response.data.data || []); // ✅ Ensure array
        } catch (error) {
            toast.error("Could Not Get Instructor Dashboard");
            setDetails([]); // ✅ Fallback to empty array
        }
        toast.dismiss(toastId);
    };

    useEffect(() => {
        fetchInstructorCourses();
        getInstructorDashboard();
    }, []);

    // ✅ Ensure `details` is an array before calling `reduce`
    //const totalEarnings = Array.isArray(details) ? details.reduce((acc, course) => acc + (course?.totalRevenue || 0), 0) : 0;
    //const totalStudents = Array.isArray(details) ? details.reduce((acc, course) => acc + (course?.totalStudents || 0), 0) : 0;


    const totalEarnings = details.totalRevenue;
    const totalStudents = details.totalStudents;
    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <div className='space-y-2'>
                <h1 className='text-2xl font-bold text-richblack-5'>Hi {username} 👋</h1>
                <p className='font-medium text-richblack-200'>Let's start something new</p>
            </div>
            <div className='my-4 flex flex-col-reverse gap-3 md:flex-row md:h-[450px] md:space-x-4'>
                <div className='flex flex-col flex-1 rounded-md bg-richblack-800 p-6'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold text-richblack-5'>Visualize</p>
                        <div className='flex items-center space-x-4'>
                            <button onClick={() => setCurrentChart('revenue')} className={`px-2 py-2 rounded-md ${currentChart === 'revenue' ? 'bg-richblack-900 text-black' : 'bg-richblack-800 text-richblack-100'}`}>Revenue</button>
                            <button onClick={() => setCurrentChart('students')} className={`px-2 py-2 rounded-md ${currentChart === 'students' ? 'bg-richblack-900 text-black' : 'bg-richblack-800 text-richblack-100'}`}>Students</button>
                        </div>
                    </div>
                    <DashboardChart details={details} currentChart={currentChart} />
                </div>
                <div className='flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6'>
                    <p className='text-lg font-bold text-richblack-5'>Statistics</p>
                    <div className='mt-4 space-y-4'>
                        <div>
                            <p className='text-lg text-richblack-200'>Total Courses</p>
                            <p className='text-3xl font-semibold text-richblack-50'>{courses?.length}</p>
                        </div>
                        <div>
                            <p className='text-lg text-richblack-200'>Total Students</p>
                            <p className='text-3xl font-semibold text-richblack-50'>{totalStudents}</p>
                        </div>
                        <div>
                            <p className='text-lg text-richblack-200'>Total Earnings</p>
                            <p className='text-3xl font-semibold text-richblack-50'>₹ {totalEarnings}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revenue;

