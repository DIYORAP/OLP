import React from "react";
import { BarChart4, MonitorPlay, Radio, Users, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Using React Router
import { useDispatch } from "react-redux";
import { signOut } from "@/redux/Slice/userSlice";
import { resetCourseState } from "@/redux/Slice/courseSlice";

const Sidebar = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/signout');
            dispatch(signOut());
            dispatch(resetCourseState());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const sidebarRoutes = [
        { icon: <MonitorPlay />, label: "Courses", path: "dashboard/mycourses" },
        { icon: <BarChart4 />, label: "Performance", path: "#" }, // Placeholder paths
        { icon: <Users />, label: "Students", path: "#" }, // Placeholder paths
        { icon: <Radio />, label: "CreateSession", path: "/insructor/session" }, // Placeholder paths
        { icon: <LogOut />, label: "Logout", onClick: handleSignOut } // Logout button
    ];

    return (
        <div className="flex flex-col w-64 border-r px-3 my-4 gap-4 text-sm font-medium">
            {sidebarRoutes.map((route, index) => (
                route.onClick ? (
                    // Use button for actions like logout
                    <button
                        key={index}
                        onClick={route.onClick}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#FFF8EB]">
                        {route.icon} {route.label}
                    </button>
                ) : (
                    // Use Link for routes with paths
                    <Link
                        to={route.path}
                        key={route.path || index} // Ensure key is unique
                        className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#FFF8EB] 
                        ${location.pathname.startsWith(route.path) && "bg-[#e7e5e3] hover:bg-[#000000]/80"}`}
                    >
                        {route.icon} {route.label}
                    </Link>
                )
            ))}
        </div>
    );
};

export default Sidebar;
