import iconBtn from '@/components/common/iconBtn'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const MyProfile = () => {

    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate();
    return (
        <div className='mx-auto w-11/12 max-w-[1000px] items-center py-10'>
            <div className='p-12 '>
                <h1 className='mb-14 text-3xl font-medium text-black '>
                    My Profile
                </h1>

                {/* section 1 */}
                <div className='flex items-center justify-end rounded-md border-[1px] border-black bg-white p-3 md:p-8 md:px-12'>
                    <div className='flex w-full items-center gap-x-4 '>
                        <img
                            src={currentUser.profilePic}
                            alt={`profile-${currentUser?.username}`}
                            className='aspect-square w-[78px] rounded-full object-cover' />
                        <div className='space-y-1'>
                            <p className='text-lg font-semibold text-richblack-5'> {currentUser?.username} </p>
                            <p className=' text-[11px] md:text-sm text-richblack-300 md:max-w-full max-w-[220px] break-words'> {currentUser?.email}</p>
                        </div>
                    </div>
                    <div className="hidden md:block">

                        <Link to="/dashboard/settings">
                            <Button> Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* section 2
                <div className='my-10 flex flex-col gap-y-3 md:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-white p-3 md:p-8 md:px-12'>
                    <div className='flex w-full items-center justify-between'>
                        <p className='text-lg font-semibold text-richblack-5'>About</p>
                        <div >
                            <IconBtn
                                text="Edit"
                                onclick={() => {
                                    navigate("/dashboard/settings")
                                }} />
                        </div>
                    </div>
                    <p className='text-richblack-400 text-sm font-medium'> {currentUser?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
                </div> */}

                {/* section 3 */}
                <div className='my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-black bg-white p-3 md:p-8 md:px-12'>
                    <div className='flex w-full items-center justify-between'>
                        <p className='text-lg font-semibold text-richblack-5'>Personal Details</p>
                        <div className=''>
                            <Link to="/dashboard/settings">
                                <Button> Edit
                                </Button>
                            </Link>

                        </div>
                    </div>
                    <div className='flex gap-y-5 md:flex-row flex-col max-w-[500px] justify-between'>
                        <div className='flex flex-col gap-y-5'>
                            <div>
                                <p className='mb-2 text-black font-bold'>username:</p>
                                <p className='text-sm font-medium text-richblack-5'>{currentUser?.username}</p>
                            </div>
                            <div>
                                <p className='mb-2 font-bold text-black'>Email:</p>
                                <p className='text-sm font-medium text-richblack-5 break-words'>{currentUser?.email}</p>
                            </div>
                            <div>
                                <p className='mb-2 font-bold text-black'>Gender:</p>
                                <p className='text-sm font-medium text-richblack-5'>{currentUser?.additionalDetails?.gender ?? "Add Gender"}</p>
                            </div>
                            <div>
                                <p className='mb-2 font-bold text-black'>Phone Number:</p>
                                <p className='text-sm font-medium text-richblack-5'>{currentUser?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                            </div>
                            <div>
                                <p className='mb-2 font-bold text-black'>Date of Birth:</p>
                                <p className='text-sm font-medium text-richblack-5'>{currentUser?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div >

    )
}

export default MyProfile
