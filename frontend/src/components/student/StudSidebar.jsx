import React from "react";
import { LayoutDashboard, HardDriveDownload, Cog, Radio, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Using React Router

const StudSidebar = () => {
    const location = useLocation();

    // Define sidebar routes
    const sidebarRoutes = [
        { icon: <LayoutDashboard />, label: "Dashboard", path: "/student/courses" },
        { icon: <HardDriveDownload />, label: "Purchases", path: "/student/purchase" },
        { icon: <Radio />, label: "liveSession", path: "student/session" },
        { icon: <Cog />, label: "Settings", path: "student/setting" },
        { icon: <LogOut />, label: "Logout", path: "#" },



    ];

    return (
        <div className="flex flex-col w-64 border-r px-3 my-4 gap-4 text-sm font-medium">
            {sidebarRoutes.map((route) => (
                <Link
                    to={route.path}
                    key={route.path}
                    className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#e0e0df] 
            ${location.pathname.startsWith(route.path) && "bg-white hover:text-black"}`}
                >
                    {route.icon} {route.label}
                </Link>
            ))}
        </div>
    );
};

export default StudSidebar;

