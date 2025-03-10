import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";

const AdminSidebarLayout = () => {
    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-gray-200">
                <Sidebar />
            </div>

            {/* Main content - flex-grow to take remaining space */}
            <div className="flex-1 p-4">
                <Outlet /> {/* This is where the routed content will be rendered */}
            </div>
        </div>
    );
};

export default AdminSidebarLayout;
