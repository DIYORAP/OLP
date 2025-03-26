import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
            <div className="text-center max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-800">
                    <Typewriter
                        options={{
                            strings: [
                                "Empower Your Future With Coding Skills 🚀",
                                "Master Web Development 💻",
                                "Learn Data Science & AI 🤖",
                                "Advance in Cloud Computing ☁️",
                                "Explore Cybersecurity 🔒",
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                        }}
                    />
                </h1>
                <p className="text-lg text-gray-700 mt-4 font-medium">
                    Learn at your own pace, from anywhere in the world. Gain access to hands-on projects and personalized feedback from top instructors..
                </p>
                <Link to="/login">
                    <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                        Get Started Now 🚀
                    </button>
                </Link>
            </div>

            <div className="mt-12 max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        title: "💡 Interactive Courses",
                        description:
                            "Structured lessons with engaging exercises & real-world examples.",
                    },
                    {
                        title: "🚀 Career-Focused Training",
                        description: "Gain the skills employers demand and boost your career with practical knowledge.",
                    },
                    {
                        title: "💡 Interactive Learning Experience",
                        description: "Engage with interactive lessons, real-world case studies, and community discussions.",
                    },
                    {
                        title: "🎥 Live Doubt-Solving",
                        description:
                            "Join live sessions with instructors to clear your doubts.",
                    },
                    {
                        title: "🌍 Learn Anytime, Anywhere",
                        description:
                            "Flexible learning from the comfort of your home, 24/7.",
                    },
                    {
                        title: "📚 Comprehensive Learning Paths",
                        description: "Follow structured courses designed to take you from beginner to expert step by step.",
                    },
                ].map((feature, index) => (
                    <div key={index} className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800">{feature.title}</h2>
                        <p className="text-gray-600 mt-2">{feature.description}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default HomePage;
