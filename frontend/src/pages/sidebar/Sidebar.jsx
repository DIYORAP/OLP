import React from 'react'
import Sidebarroute from "../../components/Sidebarroutes"

function Sidebar() {
    return (
        <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
            <Sidebarroute />
        </div>
    )
}

export default Sidebar
