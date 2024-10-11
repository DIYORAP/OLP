import React, { useState } from 'react';
import SignUp from '../pages/signup/SignUp';
import Login from '../pages/Login';

const Header = () => {
    const [showloginModel, setloginModel] = useState(false);
    const [showModel, setShowModel] = useState(false);

    return (
        <header class='flex  bg-white border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide relative z-50'>
            <div class='flex flex-wrap items-center lg:gap-y-2 gap-4 '>
                <h2 className="font-bold text-2xl">SkillIQ</h2>

            </div>
            <div
                class='flex border-2 focus-within:border-gray-400 rounded-full ml-48 px-7 py-3 overflow-hidden max-w-64 max-lg:hidden '>
                <input type='text' placeholder='Search something...' class='w-full text-sm bg-transparent outline-none pr-2' />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                    class="cursor-pointer fill-gray-600">
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
            </div>
            <div class="flex items-center ml-auto">
                <ul className='flex font-bold'>
                    <li class='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
                        class='text-[#000000] hover:text-[#0b0b0c] text-[15px] block font-semibold'>Tech on SkillIQ</a></li>

                    <li class='max-lg:border-b max-lg:py-3 px-3'><a href='javascript:void(0)'
                        class='text-[#000] hover:text-[#040404] text-[15px] block font-semibold'>Courses</a></li>
                </ul>

            </div>
            <div className="items-end">
                <div class='flex items-center '>


                    {/* <span class="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" class="cursor-pointer fill-[#333] inline"
                            viewBox="0 0 512 512">
                            <path
                                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                                data-original="#000000"></path>
                        </svg>
                        <span class="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">0</span>
                    </span> */}
                    <button onClick={() => setloginModel(true)}
                        class='ml-3 mr-3 px-5 py-2 text-sm rounded-full text-white border-2 border-[#000000] bg-[#070707] hover:bg-[#000000]'>Login
                    </button>
                    {showloginModel && <Login oncon={() => setloginModel(false)} />}

                    <button onClick={() => setShowModel(true)}
                        class='px-5 py-2 text-sm rounded-full text-white border-2 border-[#000000] bg-[#000000] hover:bg-[#004bff]'>Sign
                        In</button>
                    {showModel && <SignUp onClose={() => setShowModel(false)} />}

                    <button id="toggleOpen" class='lg:hidden'>
                        <svg class="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>

        </header >
    );
};

export default Header;
