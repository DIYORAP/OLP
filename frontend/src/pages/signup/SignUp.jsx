
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { IoCloseSharp } from "react-icons/io5";
// import { useNavigate, Link } from "react-router-dom";

// const SignUp = () => {
//     const [formData, setFormData] = useState({ role: "Student" });
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.id]: e.target.value });
//     };

//     const handleRoleChange = (e) => {
//         setFormData({ ...formData, role: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await fetch("/api/auth/signup", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });
//             const data = await res.json();

//             if (!res.ok) {
//                 setLoading(false);
//                 setError(data.message);
//                 toast.error("signup error")
//                 return;
//             }


//             toast.success("Signup successful!");

//             setLoading(false);
//             setError(null);
//             navigate("/");
//         } catch (error) {
//             setLoading(false);
//             setError(error.message);
//         }
//     };

//     return (
//         <section className="fixed inset-0 mt-5 bg-black bg-opacity-40 backdrop-blur-sm">
//             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                 <div className="relative w-full rounded-lg shadow border sm:max-w-md xl:p-0 bg-black border-gray-700">
//                     <Link to="/">
//                         <button className="absolute top-4 right-4 text-white">
//                             <IoCloseSharp className="text-white" size={30} />
//                         </button>
//                     </Link>
//                     <div className="p-6 space-y-4 sm:p-8">
//                         <h1 className="text-xl font-bold tracking-tight md:text-2xl text-white">
//                             Create an account
//                         </h1>

//                         {/* Role Selection */}
//                         <div className="flex justify-center space-x-6">
//                             <label className="flex items-center space-x-2 text-lg text-white font-medium">
//                                 <input
//                                     type="radio"
//                                     name="role"
//                                     value="Student"
//                                     checked={formData.role === "Student"}
//                                     onChange={handleRoleChange}
//                                     className="w-5 h-5 bg-gray-700 border-gray-300 focus:ring-primary-600"
//                                 />
//                                 <span>Student</span>
//                             </label>
//                             <label className="flex items-center space-x-2 text-lg text-white font-medium">
//                                 <input
//                                     type="radio"
//                                     name="role"
//                                     value="Instructor"
//                                     checked={formData.role === "Instructor"}
//                                     onChange={handleRoleChange}
//                                     className="w-5 h-5 bg-gray-700 border-gray-300 focus:ring-primary-600"
//                                 />
//                                 <span>Instructor</span>
//                             </label>
//                         </div>

//                         <form className="space-y-4" onSubmit={handleSubmit}>
//                             <div>
//                                 <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
//                                     Username
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="username"
//                                     className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//                                     placeholder="Enter your name"
//                                     required
//                                     onChange={handleChange}
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//                                     placeholder="name@company.com"
//                                     required
//                                     onChange={handleChange}
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
//                                     Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     placeholder="••••••••"
//                                     className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//                                     required
//                                     onChange={handleChange}
//                                 />
//                             </div>



//                             <button
//                                 disabled={loading}
//                                 type="submit"
//                                 className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5"
//                             >
//                                 {loading ? "Loading..." : "Create an account"}
//                             </button>

//                             <p className="text-sm font-light text-gray-300">
//                                 Already have an account?{" "}
//                                 <a href="/login" className="font-medium text-primary-600 hover:underline">
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
    const [formData, setFormData] = useState({ role: "Student", username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: "" }); // Clear error when user types
    };

    const handleRoleChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (formData.username.length < 5) newErrors.username = "Username must be at least 5 characters long.";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email address.";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

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
                toast.error(data.message || "Signup error");
                return;
            }

            toast.success("Signup successful!");
            setLoading(false);
            navigate("/");
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong. Please try again.");
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
                                    value={formData.username}
                                    className={`border ${errors.username ? "border-red-500" : "border-gray-300"} text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white`}
                                    placeholder="Enter your name"
                                    required
                                    onChange={handleChange}
                                />
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    className={`border ${errors.email ? "border-red-500" : "border-gray-300"} text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white`}
                                    placeholder="name@company.com"
                                    required
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    className={`border ${errors.password ? "border-red-500" : "border-gray-300"} text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white`}
                                    placeholder="••••••••"
                                    required
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
