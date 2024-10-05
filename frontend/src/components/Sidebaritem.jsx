import { cn } from '@/lib/utils';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebaritem({ icon: Icon, label, href }) {
  const location = useLocation(); // Get current pathname
  const navigate = useNavigate(); // Use navigate for routing

  const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);

  const onClick = () => {
    navigate(href); // Use navigate instead of Router.push
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className='flex items-center gap-x-2 py-4'>
        <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
        {label}
      </div>
      <div className={cn("ml-auto opacity-0 border-2 border-black h-full transition-all", isActive && "opacity-100")} />

    </button>
  );
}
