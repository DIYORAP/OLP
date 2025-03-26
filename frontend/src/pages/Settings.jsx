import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Settings() {
    const { currentUser } = useSelector((state) => state.user);
    const token = currentUser?.token;
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(currentUser?.profilePic || "/default-avatar.png");

    const [formData, setFormData] = useState({
        username: currentUser?.username || "",
        dateOfBirth: currentUser?.additionalDetails?.dateOfBirth || "",
        gender: currentUser?.additionalDetails?.gender || "Prefer not to say",
        contactNumber: currentUser?.additionalDetails?.contactNumber || "",
        about: currentUser?.additionalDetails?.about || "",
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!image) {
            return toast.error("Please select an image first.");
        }

        const uploadData = new FormData();
        uploadData.append("profilePic", image);

        console.log("Uploading Image:", uploadData.get("profilePic"));

        const toastId = toast.loading("Updating profile picture...");
        try {
            const response = await axios.put("/api/profile/updateProfilePicture", uploadData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (!response.data.success) throw new Error(response.data.message || "Upload failed.");

            setImagePreview(response.data.profilePic);
            toast.success("Profile picture updated successfully");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error(error.response?.data?.message || "Failed to upload image.");
        } finally {
            toast.dismiss(toastId);
        }
    };
    const handleAdditionalDetails = async (e) => {
        e.preventDefault();
        if (!formData.username.trim() || !formData.contactNumber.trim()) {
            return toast.error("Please fill in all required fields.");
        }

        const toastId = toast.loading("Updating profile...");
        try {
            const response = await axios.put("/api/profile/updateProfile", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.data.success) throw new Error(response.data.message || "Update failed.");

            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 text-black rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
                <img
                    src={imagePreview}
                    alt="profile"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer border-2 border-gray-500 shadow-lg"
                    onClick={() => document.getElementById("upload").click()}
                />
                <form onSubmit={handleUpload} className="mt-3">
                    <div className="flex flex-row gap-3">
                        <label
                            className="cursor-pointer rounded-md bg-white py-2 px-5  text-black border-2 border-black"
                            htmlFor="upload"
                        >
                            Select Image
                            <input
                                id="upload"
                                type="file"
                                className="hidden"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleFileChange}
                            />
                        </label>
                        <button
                            type="submit"
                            className="flex items-center bg-black cursor-pointer gap-x-2 rounded-md py-2 h-15 p-9   text-white"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>

            <form onSubmit={handleAdditionalDetails} className="mt-6 p-6 border border-gray-700 rounded-md">
                <h2 className="text-lg font-semibold text-black mb-4">Profile Information</h2>
                <div className="flex flex-col gap-4">
                    <label className="flex flex-col">
                        <span className="text-black">Name:</span>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            className="text-black px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-black">Date of Birth:</span>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            className="text-black px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-black">Gender:</span>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="text-black px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2"
                        >
                            <option value="Prefer not to say">Prefer not to say</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-Binary">Non-Binary</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <label className="flex flex-col">
                        <span className="text-black">Contact Number:</span>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                            required
                            className="text-black px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-black">About:</span>
                        <input
                            type="text"
                            name="about"
                            value={formData.about}
                            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                            className="text-black px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2"
                        />
                    </label>
                </div>

                <button type="submit" className="mt-6 w-full bg-black text-white py-2 rounded-md">
                    Save
                </button>
            </form>
        </div>
    );
}
