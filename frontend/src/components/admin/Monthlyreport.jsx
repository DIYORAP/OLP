import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const MonthlyReport = () => {
    const [reportData, setReportData] = useState([]);

    const fetchMonthlyReport = async () => {
        const toastId = toast.loading("Fetching report...");
        try {
            const response = await axios.get("/api/profile/getadmin2", {
                headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` },
            });


            if (!response.data.success) throw new Error("Could not fetch report");

            setReportData(response.data.data.monthlyReport);
        } catch (error) {
            toast.error(error.message);
        }
        toast.dismiss(toastId);
    };

    useEffect(() => {
        fetchMonthlyReport();
    }, []);
    console.log(reportData);
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Monthly Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">💰 Revenue Report</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reportData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalRevenue" fill="#4CAF50" name="Total Revenue (₹)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Students Enrollment Chart */}
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">📈 Student Enrollment</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={reportData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="totalStudents" stroke="#2196F3" strokeWidth={3} name="Total Students" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default MonthlyReport;
