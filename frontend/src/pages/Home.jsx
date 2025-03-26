import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Course_Card from "./Coursecard";
const categories = [
    { value: "all", label: "All Courses" },
    { value: "web-development", label: "Web Development" },
    { value: "devops", label: "DevOps" },
    { value: "ai-ml", label: "AI & ML" },
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "dsa", label: "DSA" },
    { value: "computer-networks", label: "Computer Networks" },
];

export default function Home() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("/api/courses/cou");
                const data = await response.json();
                setCourses(data);
                setFilteredCourses(data); // Show all courses initially
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        fetchCourses();
    }, []);
    useEffect(() => {
        if (courses?.ratingAndReviews?.length > 0) {
            const count = GetAvgRating(courses?.ratingAndReviews);
            setAvgReviewCount(count);
            console.log("getCourseDetails -> count", parseInt(count));
        }
    });
    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "all") {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter((course) => course.category === category);
            setFilteredCourses(filtered);
        }
    };

    return (
        <>


            <div className="flex gap-3 mb-6 justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => handleCategoryChange(cat.value)}
                        className={`px-4 py-2 rounded-lg text-white transition-all duration-200 ${selectedCategory === cat.value ? "bg-black" : "bg-gray-700"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="mx-auto mt-3 grid grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:grid-cols-3 p-10">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <Course_Card key={course._id} course={course} Height="md:h-[270px] md:w-[457px]" />
                    ))
                ) : (
                    <p className="text-center text-lg">No courses available in this category.</p>
                )}
            </div>
        </>
    );
}
