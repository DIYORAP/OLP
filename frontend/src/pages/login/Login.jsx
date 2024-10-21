import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/Slice/userSlice.js";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
    const [formData, setFormData] = useState({ role: "Student" });
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    //console.log(currentUser);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        console.log("Form Data Submitted:", formData); // Check form data

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("API Response:", data); // Check API response

            if (data.success === false) {
                dispatch(signInFailure(data));
                return;
            }

            dispatch(signInSuccess(data)); // Ensure you are passing the right data
            navigate('/student/courses');
            toast.success("successfull login")
        } catch (error) {
            toast.error("login error check your password and email ")
            dispatch(signInFailure(error));
        }
    };

    return (
        <section className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="relative w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-black border-gray-700">
                    <Link to="/">
                        <button className="absolute top-4 right-4 text-white">
                            <IoCloseSharp className="text-white" size={30} />
                        </button>
                    </Link>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Welcome to SkillIQ
                        </h1>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white"
                                    placeholder="name@company.com"
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
                                    placeholder="••••••••"
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white"
                                    required
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 focus:ring-primary-600 ring-offset-gray-800"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-300">
                                        I accept the{' '}
                                        <a className="font-medium text-primary-600 hover:underline" href="#">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                {loading ? 'Loading...' : 'Sign In'}
                            </button>


                            <p className="text-sm font-light text-gray-400">
                                Don't have an account?{' '}
                                <a href="/signup" className="font-medium text-primary-600 hover:underline">
                                    Sign up here
                                </a>
                            </p>
                        </form>
                    </div>
                    <p className='text-red-500 text-sm'>
                        {error ? error.message || "somthing went wrong" : " "}
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Login;
