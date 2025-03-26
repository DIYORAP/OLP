// import React, { useState } from 'react';
// import { IoCloseSharp } from 'react-icons/io5';
// import { useNavigate, Link } from 'react-router-dom';

// const SignUp = () => {
//     const [formData, setFormData] = useState({ role: "Student" });
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.id]: e.target.value,

//         });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await fetch('/api/auth/signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });
//             const data = await res.json();
//             console.log(data);
//             if (data.success === false) {
//                 setLoading(false);
//                 setError(data.message);
//                 return;
//             }
//             setLoading(false);
//             setError(null);
//             navigate('/');
//         } catch (error) {
//             setLoading(false);
//             setError(error.message);
//         }
//     };


//     return (
//         <section className="fixed inset-0 mt-5 bg-black bg-opacity-40 backdrop-blur-sm">
//             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                 <div className="relative w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-black border-gray-700">
//                     <Link to="/">
//                         <button className="absolute top-4 right-4 text-white">
//                             <IoCloseSharp className="text-white" size={30} />
//                         </button>
//                     </Link>
//                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                         <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
//                             Create an account
//                         </h1>

//                         <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//                             <div>
//                                 <label htmlFor="username" className="block mb-2 text-sm font-medium  text-white">
//                                     Username
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="username"
//                                     id="username"
//                                     className=" border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//                                     placeholder="name"
//                                     required
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">
//                                     Your email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     id="email"
//                                     className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//                                     placeholder="name@company.com"
//                                     required
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">
//                                     Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     id="password"
//                                     placeholder="••••••••"
//                                     className=" border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//                                     required
//                                     onChange={handleChange}
//                                 />
//                             </div>

//                             <div className="flex items-start">
//                                 <div className="flex items-center h-5">
//                                     <input
//                                         id="terms"
//                                         aria-describedby="terms"
//                                         type="checkbox"
//                                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  focus:ring-primary-600 ring-offset-gray-800"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="ml-3 text-sm">
//                                     <label htmlFor="terms" className="font-light  text-gray-300">
//                                         I accept the{' '}
//                                         <a className="font-medium text-primary-600 hover:underline text-primary-500" href="#">
//                                             Terms and Conditions
//                                         </a>
//                                     </label>
//                                 </div>
//                             </div>
//                             <button
//                                 disabled={loading}
//                                 type="submit"
//                                 className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
//                             >
//                                 {loading ? 'Loading...' : 'Create an account'}
//                             </button>
//                             <p className="text-sm font-light text-gray-300 ">
//                                 Already have an account?{' '}
//                                 <a href="#" className="font-medium text-primary-600 hover:underline text-primary-500">
//                                     Login here
//                                 </a>
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SignUp;
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({ role: "Student" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRoleChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                setLoading(false);
                setError(data.message);
                toast.error("signup error")
                return;
            }


            toast.success("Signup successful!");

            setLoading(false);
            setError(null);
            navigate("/");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <section className="fixed inset-0 mt-5 bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="relative w-full rounded-lg shadow border sm:max-w-md xl:p-0 bg-black border-gray-700">
                    <Link to="/">
                        <button className="absolute top-4 right-4 text-white">
                            <IoCloseSharp className="text-white" size={30} />
                        </button>
                    </Link>
                    <div className="p-6 space-y-4 sm:p-8">
                        <h1 className="text-xl font-bold tracking-tight md:text-2xl text-white">
                            Create an account
                        </h1>

                        {/* Role Selection */}
                        <div className="flex justify-center space-x-6">
                            <label className="flex items-center space-x-2 text-lg text-white font-medium">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Student"
                                    checked={formData.role === "Student"}
                                    onChange={handleRoleChange}
                                    className="w-5 h-5 bg-gray-700 border-gray-300 focus:ring-primary-600"
                                />
                                <span>Student</span>
                            </label>
                            <label className="flex items-center space-x-2 text-lg text-white font-medium">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Instructor"
                                    checked={formData.role === "Instructor"}
                                    onChange={handleRoleChange}
                                    className="w-5 h-5 bg-gray-700 border-gray-300 focus:ring-primary-600"
                                />
                                <span>Instructor</span>
                            </label>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your name"
                                    required
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                                    className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    onChange={handleChange}
                                />
                            </div>



                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                {loading ? "Loading..." : "Create an account"}
                            </button>

                            <p className="text-sm font-light text-gray-300">
                                Already have an account?{" "}
                                <a href="/login" className="font-medium text-primary-600 hover:underline">
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
