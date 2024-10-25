import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'


export default function Settings() {
    const { currentUser } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        about: "",
    })

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handelAdditionalDetails = (e) => {
        e.preventDefault()
        // updateAdditionalDetails(token, formData);
    }
    return (
        <div>
            <input
                // onChange={(e) => setFile(e.target.files[0])}
                type="file"
                //  ref={fileRef}
                hidden
                accept="image/*"
            />
            <img
                // onClick={() => fileRef.current.click()}
                src={currentUser.profilePic}
                alt="profile"
                className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            />


            <div>
                <form onSubmit={handelAdditionalDetails}>
                    <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                        <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="firstName" className=" text-richblack-50">First Name</label>
                                <input defaultValue={currentUser.firstName || null} type="text" name="firstName" id="firstName" placeholder="Enter first name" className="form-style" onChange={handleOnChange} />
                            </div>
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="lastName" className="text-richblack-50">Last Name</label>
                                <input defaultValue={currentUser.lastName || null} type="text" name="lastName" id="lastName" placeholder="Enter first name" className="form-style" onChange={handleOnChange} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="dateOfBirth" className="text-richblack-50">Date of Birth</label>
                                <input defaultValue={currentUser?.additionalDetails.dateOfBirth || null} type="date" name="dateOfBirth" id="dateOfBirth" className="form-style" onChange={handleOnChange} />
                            </div>
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="gender" className="text-richblack-50">Gender</label>
                                <select defaultValue={currentUser?.additionalDetails.gender || null} type="text" name="gender" id="gender" className="form-style" onChange={handleOnChange}>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-Binary">Non-Binary</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="contactNumber" className="text-richblack-50">Contact Number</label>
                                <input defaultValue={currentUser?.additionalDetails.contactNumber || null} type="tel" name="contactNumber" id="contactNumber" placeholder="Enter Contact Number" className="form-style" onChange={handleOnChange} />
                            </div>
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="about" className="text-richblack-50">About</label>
                                <input defaultValue={currentUser?.additionalDetails.about || null} type="text" name="about" id="about" placeholder="Enter Bio Details" className="form-style" onChange={handleOnChange} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2"><button className="flex items-center bg-black cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white undefined" type="submit">Save</button></div>
                </form>
            </div>
        </div>
    )
}
