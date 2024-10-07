import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './InsruSidebar'; // import the sidebar component

function LayoutWithSidebar({ children }) {
    const location = useLocation();
    const sidebarPages = ['/sidebar', "/search", "mess"]; // specify routes where sidebar should appear

    return (
        <div>
            {sidebarPages.includes(location.pathname) && <Sidebar />} {/* Sidebar only on specific routes */}
            <main>{children}</main>
        </div>
    );
}

export default LayoutWithSidebar;
