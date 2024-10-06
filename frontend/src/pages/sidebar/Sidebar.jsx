import React, { useState } from "react";
import Sidebarroute from "../../components/Sidebarroutes";

function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <div className={`fixed inset-0 z-50 md:relative md:flex h-screen transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="bg-white w-64 border-r-2 border-gray-300 shadow-sm">
                <div className="flex flex-col overflow-y-auto h-full">
                    <Sidebarroute />
                </div>
                <button
                    className="absolute top-4 right-4 md:hidden"
                    onClick={toggleSidebar}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
