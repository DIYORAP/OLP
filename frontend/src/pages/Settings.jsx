import axios from 'axios';
import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.user);
    const pfp = useSelector(state => state.profile.image);
    const [profilePicture, setProfilePicture] = useState(pfp);
    const token = useSelector(state => state.user.token);
    const { currentUser } = useSelector(state => state.user);
    const fileRef = useRef(null);
    console.log(token)
    const [formData, setFormData] = useState({
        username: currentUser.username || "",
        dateOfBirth: currentUser?.additionalDetails.dateOfBirth || "",
        gender: currentUser?.additionalDetails.gender || "Prefer not to say",
        contactNumber: currentUser?.additionalDetails.contactNumber || "",
        about: currentUser?.additionalDetails.about || "",
    });

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = fileRef.current?.files[0];
        if (!file) {
            return toast.error("No file selected.");
        }

        try {
            await updatePfp(token, file);
            toast.success("Profile picture uploaded successfully.");
        } catch (error) {
            toast.error("Error uploading profile picture.");
            console.error("File upload error:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateAdditionalDetails = async (token, additionalDetails) => {
        const { username, dateOfBirth, gender, contactNumber, about } = additionalDetails;
        const toastId = toast.loading("Updating...");
        try {
            const response = await axios.put("/api/profile/updateProfile", {
                username,
                dateOfBirth,
                gender,
                contactNumber,
                about,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.data.success) {
                throw new Error(response.data.message || "Update failed.");
            }

            toast.success("Additional Details Updated Successfully");
            localStorage.setItem("user", JSON.stringify({ ...user, ...additionalDetails }));

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update details.";
            console.error("Error updating additional details:", error);
            toast.error(errorMessage);
        } finally {
            toast.dismiss(toastId);
        }
    };

    const handleAdditionalDetails = (e) => {
        e.preventDefault();
        if (!formData.username.trim() || !formData.contactNumber.trim()) {
            return toast.error("Please fill in all required fields.");
        }
        updateAdditionalDetails(token, formData);
    };

    return (
        <div>
            <input
                onChange={handleFileChange}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
            />
            <img
                onClick={() => fileRef.current.click()}
                src={profilePicture}
                alt="profile"
                className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            />

            <div>
                <form onSubmit={handleAdditionalDetails}>
                    <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                        <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
                        <div className="flex flex-col gap-5 lg:flex-row">
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                                <label htmlFor="username" className="text-richblack-50">Name</label>
                                <input
                                    value={formData.username}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter first name"
                                    className="form-style"
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex flex-col gap-5 lg:flex-row">
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="dateOfBirth" className="text-richblack-50">Date of Birth</label>
                                    <input
                                        value={formData.dateOfBirth}
                                        type="date"
                                        name="dateOfBirth"
                                        id="dateOfBirth"
                                        className="form-style"
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="gender" className="text-richblack-50">Gender</label>
                                    <select
                                        value={formData.gender}
                                        name="gender"
                                        id="gender"
                                        className="form-style"
                                        onChange={handleOnChange}
                                    >
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
                                    <input
                                        value={formData.contactNumber}
                                        type="tel"
                                        name="contactNumber"
                                        id="contactNumber"
                                        placeholder="Enter Contact Number"
                                        className="form-style"
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 lg:w-[48%]">
                                    <label htmlFor="about" className="text-richblack-50">About</label>
                                    <input
                                        value={formData.about}
                                        type="text"
                                        name="about"
                                        id="about"
                                        placeholder="Enter Bio Details"
                                        className="form-style"
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="flex items-center bg-black cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white" type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
