import React, { useEffect, useState } from "react";
import Course_Card from "./Coursecard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePag from "./Homesession";

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/courses/cou");
                const data = await response.json();
                setCourses(data);
                setFilteredCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "all") {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter((course) => course.category === category);
            setFilteredCourses(filtered);
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className=" bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
            <HomePag />
            <div className="w-11/12 mx-auto mt-6 mb-28">
                <h2 className="text-3xl font-semibold text-left ml-20 mb-4"> Trending Courses</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900"></div>
                    </div>
                ) : (
                    <Slider {...sliderSettings} className="px-4">
                        {courses.slice(0, 6).map((course) => (
                            <div key={course._id} className="flex flex-col items-center p-2">
                                <Course_Card
                                    course={course}
                                    Height="h-[250px] w-full"
                                    className="shadow-lg rounded-lg"
                                />
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
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



            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900"></div>
                </div>
            ) : (
                <div className="mx-auto mt-6 grid grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:grid-cols-3 p-10">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <Course_Card
                                key={course._id}
                                course={course}
                                Height="md:h-[270px] md:w-[457px]"
                                className="shadow-md rounded-lg"
                            />
                        ))
                    ) : (
                        <p className="text-center text-lg">No courses available in this category.</p>
                    )}
                </div>
            )}
        </div>
    );
}
