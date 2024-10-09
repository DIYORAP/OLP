import React from "react";
import Sidebar from './InsruSidebar'; // Make sure the path is correct
import { Outlet } from "react-router-dom"; // Import Outlet to render child routes

const SidebarLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar - fixed width */}
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

export default SidebarLayout;
