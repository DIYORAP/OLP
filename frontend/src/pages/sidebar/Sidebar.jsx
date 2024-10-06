import React from 'react';
import Sidebarroute from "../../components/Sidebarroutes";

function Sidebar() {
    return (

        <div className="flex h-screen">

            <div className="hidden md:flex  z-50  border-r-2 border-gray-300 bg-white shadow-sm">
                <div className="flex flex-col overflow-y-auto w-56">
                    <Sidebarroute />
                </div>
            </div>
        </div>



    );
}

export default Sidebar;
