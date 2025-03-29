import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/Slice/userSlice.js";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Logina() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        console.log("Admin Login Attempt:", formData);

        try {
            const res = await fetch("/api/auth/signina", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success === false) {
                dispatch(signInFailure(data));
                return;
            }

            dispatch(signInSuccess(data));
            toast.success("Admin logged in successfully");
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error("Login error: Check your email and password");
            dispatch(signInFailure(error));
        }
    };

    return (
        <section className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="relative w-full rounded-lg shadow border sm:max-w-md bg-black border-gray-700">
                    <Link to="/">
                        <button className="absolute top-4 right-4 text-white">
                            <IoCloseSharp size={30} />
                        </button>
                    </Link>
                    <div className="p-6 space-y-4 sm:p-8">
                        <h1 className="text-2xl font-bold text-white">Admin Login</h1>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white"
                                    placeholder="admin@example.com"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white"
                                    placeholder="••••••••"
                                    required
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                {loading ? 'Loading...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                    <p className='text-red-500 text-sm'>{error ? error.message || "Something went wrong" : ""}</p>
                </div>
            </div>
        </section>
    );
}

export default Logina;
