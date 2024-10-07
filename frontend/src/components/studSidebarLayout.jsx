import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet to render child routes
import StudSidebar from "./StudSidebar";

const StudSidebarLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar - fixed width */}
            <div className="w-64 bg-gray-200">
                <StudSidebar />
            </div>

            {/* Main content - flex-grow to take remaining space */}
            <div className="flex-1 p-4">
                <Outlet /> {/* This is where the routed content will be rendered */}
            </div>
        </div>
    );
};

export default StudSidebarLayout;

