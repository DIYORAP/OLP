// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';

// const Header = () => {
//     const { currentUser } = useSelector((state) => state.user);
//     const navigate = useNavigate();

//     return (
//         <header className='flex bg-white border-b py-4 sm:px-8 px-6 font-sans min-h-[80px] tracking-wide relative z-50'>
//             <Link to="/" ><div className='flex flex-wrap items-center lg:gap-y-2 gap-4'>
//                 <h2 className="font-bold text-2xl">SkillIQ</h2>
//             </div>
//             </Link>

//             <div className='flex border-2 focus-within:border-gray-400 rounded-full ml-48 px-7 py-3 overflow-hidden max-w-64 max-lg:hidden'>
//                 <input
//                     type='text'
//                     placeholder='Search something...'
//                     className='w-full text-sm bg-transparent outline-none pr-2'
//                 />
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" aria-hidden="true" className="cursor-pointer fill-gray-600">
//                     <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
//                 </svg>
//             </div>
//             <div className="flex items-center ml-auto">
//                 <ul className='flex font-bold'>
//                     <li className='max-lg:border-b max-lg:py-3 px-3'>
//                         <Link to="/instructor" className='text-[#000000] hover:text-[#0b0b0c] text-[15px] block font-semibold'>
//                             Tech on SkillIQ
//                         </Link>
//                     </li>
//                     <li className='max-lg:border-b max-lg:py-3 px-3'>
//                         <a href='javascript:void(0)' className='text-[#000] hover:text-[#040404] text-[15px] block font-semibold'>
//                             Courses
//                         </a>
//                     </li>
//                 </ul>
//             </div>
//             <div className="items-end">
//                 <div className='flex items-center'>
//                     <Link to='/profile'>
//                         {currentUser?.token ? (
//                             <img
//                                 className='rounded-full h-8 w-8 object-cover mt-2 border-green-700 border-2'
//                                 src={currentUser.profilePic}
//                                 alt='profile'
//                             />
//                         ) : (
//                             <>
//                                 <Link to="/login">
//                                     <button className='ml-3 mr-3 px-5 py-2 text-sm rounded-full text-white border-2 border-[#000000] bg-[#070707] hover:bg-[#000000]'>
//                                         Login
//                                     </button>
//                                 </Link>
//                                 <Link to="/signup">
//                                     <button className='px-5 py-2 text-sm rounded-full text-white border-2 border-[#000000] bg-[#000000] hover:bg-[#004bff]'>
//                                         Sign Up
//                                     </button>
//                                 </Link>
//                             </>
//                         )}
//                     </Link>
//                     <button id="toggleOpen" className='lg:hidden'>
//                         <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//                             <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;

import { signOut } from '@/redux/Slice/userSlice';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
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

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className='flex bg-white border-b py-4 sm:px-8 px-6 font-sans min-h-[80px] tracking-wide relative z-50'>
            <Link to="/">
                <div className='flex flex-wrap items-center lg:gap-y-2 gap-4'>
                    <h2 className="font-bold text-2xl">SkillIQ</h2>
                </div>
            </Link>

            <div className='flex border-2 focus-within:border-gray-400 rounded-full ml-48 px-7 py-3 overflow-hidden max-w-64 max-lg:hidden'>
                <input
                    type='text'
                    placeholder='Search something...'
                    className='w-full text-sm bg-transparent outline-none pr-2'
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" aria-hidden="true" className="cursor-pointer fill-gray-600">
                    <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                </svg>
            </div>

            <div className="flex items-center ml-auto">
                <ul className='flex font-bold'>
                    <li className='max-lg:border-b max-lg:py-3 px-3'>
                        <Link to="/instructor" className='text-[#000000] hover:text-[#0b0b0c] text-[15px] block font-semibold'>
                            Teach on SkillIQ
                        </Link>
                    </li>
                    <li className='max-lg:border-b max-lg:py-3 px-3'>
                        <Link to='/' className='text-[#000] hover:text-[#040404] text-[15px] block font-semibold'>
                            Courses
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="relative" ref={dropdownRef}>
                {currentUser?.token ? (
                    <div className="relative flex items-center">
                        <img
                            className='rounded-full h-8 w-8 mt-2 object-cover border-green-700 border-2 cursor-pointer'
                            src={currentUser.profilePic}
                            alt='profile'
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        />
                        {isDropdownOpen && (
                            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-2 w-48">
                                <ul className="text-sm text-gray-700">
                                    <li>
                                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                    </li>
                                    {currentUser.role === "Student" && (
                                        <li>
                                            <Link to="/dashboard/enrolled-courses" className="block px-4 py-2 hover:bg-gray-100">
                                                Enrolled Courses
                                            </Link>
                                        </li>
                                    )}
                                    {currentUser.role === "Instructor" && (
                                        <li>
                                            <Link to="/dashboard/mycourses" className="block px-4 py-2 hover:bg-gray-100">
                                                My Courses
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <button onClick={handleSignOut} className="block px-4 py-2 text-red-500 hover:bg-gray-100">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Link to="/login">
                            <button className='ml-3 mr-3 px-5 py-2 text-sm rounded-full text-white border-2 border-[#000000] bg-[#070707] hover:bg-[#000000]'>
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className='px-5 py-2 text-sm rounded-full text-white border-2 border-[#000000] bg-[#000000] '>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
