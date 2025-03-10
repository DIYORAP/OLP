import React from "react";
import { BarChart4, MonitorPlay, Users, GraduationCap, DollarSign, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
        { icon: <MonitorPlay />, label: "Courses", path: "/admin/courses" },
        { icon: <Users />, label: "Students", path: "/admin/students" },
        { icon: <GraduationCap />, label: "Instructors", path: "/admin/instructors" },
        { icon: <DollarSign />, label: "Revenue", path: "/admin/revenue" },
        { icon: <LogOut />, label: "Logout", onClick: handleSignOut }
    ];

    return (
        <div className="flex flex-col w-64 border-r px-3 my-4 gap-4 text-sm font-medium">
            {sidebarRoutes.map((route, index) => (
                route.onClick ? (
                    <button
                        key={index}
                        onClick={route.onClick}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#FFF8EB]">
                        {route.icon} {route.label}
                    </button>
                ) : (
                    <Link
                        to={route.path}
                        key={route.path}
                        className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#FFF8EB] 
                        ${location.pathname.startsWith(route.path) ? "bg-[#e7e5e3] hover:bg-[#000000]/80" : ""}`}
                    >
                        {route.icon} {route.label}
                    </Link>
                )
            ))}
        </div>
    );
};

export default Sidebar;
