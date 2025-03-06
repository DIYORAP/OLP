import React from "react";
import { LayoutDashboard, HardDriveDownload, Cog, Radio, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/Slice/userSlice.js";

const StudSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/signout');
            dispatch(signOut());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const sidebarRoutes = [
        // { icon: <LayoutDashboard />, label: "Dashboard", path: "/" },
        { icon: <HardDriveDownload />, label: "Purchases", path: "/dashboard/enrolled-courses" },
        { icon: <Radio />, label: "Live Session", path: "/student/session" },
        { icon: <Cog />, label: "Settings", path: "/profile" },
        { icon: <LogOut />, label: "Logout", onClick: handleSignOut },
    ];

    return (
        <div className="flex flex-col w-64 border-r px-3 my-4 gap-4 text-sm font-medium">
            {sidebarRoutes.map((route) => (
                <Link
                    to={route.path !== "#" ? route.path : undefined}
                    key={route.path || route.label}
                    onClick={route.onClick}
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
