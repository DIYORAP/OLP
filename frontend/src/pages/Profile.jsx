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

                <div className='my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-black bg-white p-3 md:p-8 md:px-12'>
                    <div className='flex w-full items-center justify-between'>
                        <p className='text-lg font-semibold text-richblack-5'>Personal Details</p>
                    </div>
                    <div className='flex gap-y-5 md:flex-row flex-col max-w-[500px] justify-between'>
                        <div className='flex flex-col gap-y-5'>
                            <div className='flex w-full items-center gap-x-3'>
                                <img
                                    src={currentUser.profilePic}
                                    alt={`profile-${currentUser?.username}`}
                                    className='aspect-square w-[78px] rounded-full object-cover' />
                                <div className='space-y-1'>
                                    <p className='text-lg font-semibold text-richblack-5'> {currentUser?.username} </p>
                                    <p className=' text-[11px] md:text-sm text-richblack-300 md:max-w-full max-w-[220px] break-words'> {currentUser?.email}</p>
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 text-black font-bold'>Username:</p>
                                <p className='text-sm font-medium text-black'>{currentUser?.username}</p>
                            </div>
                            <div>
                                <p className='mb-2 font-bold text-black'>Email:</p>
                                <p className='text-sm font-medium text-black break-words'>{currentUser?.email}</p>
                            </div>
                            <div>
                                <p className='mb-2 font-bold text-black'>Gender:</p>
                                <p className='text-sm font-medium text-black'>{currentUser?.additionalDetails?.gender ?? "Add Gender"}</p>
                            </div>
                            <div>
                                <p className='mb-2 font-bold text-black'>Phone Number:</p>
                                <p className='text-sm font-medium text-black'>{currentUser?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                            </div>
                            <div>
                                <p className='mb-2 font-bold text-black'>Date of Birth:</p>
                                <p className='text-sm font-medium text-black'>
                                    {currentUser?.additionalDetails?.dob
                                        ? new Date(currentUser.additionalDetails.dob).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })
                                        : "Add Date of Birth"}
                                </p>
                            </div>
                            <div className='flex ml-96'>
                                <Link to="/settings">
                                    <Button> Edit
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div >

    )
}

export default MyProfile
