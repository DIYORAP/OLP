import { Compass, Layout } from 'lucide-react';
import React from 'react';
import Sidebaritem from './Sidebaritem';

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/side",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    }
];

function Sidebarroutes() {
    const routes = guestRoutes;

    return (
        <div className='flex flex-col w-full'>
            {routes.map((route) => (
                <Sidebaritem
                    key={route.href} // Use lowercase key
                    icon={route.icon} // Pass icon correctly
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
}

export default Sidebarroutes;
