import React from "react";
import { Tooltip } from "react-tooltip";

// Sample data for blogs and courses
const topBlogs = [
    { title: "How to Learn React", views: 12345, author: "John Doe", date: "2024-01-10" },
    { title: "Mastering JavaScript", views: 11000, author: "Jane Smith", date: "2024-01-08" },
    { title: "Understanding TypeScript", views: 9800, author: "Alex Johnson", date: "2024-01-06" },
    { title: "CSS Tips and Tricks", views: 9500, author: "Maria Lee", date: "2024-01-05" },
    { title: "Web Development 2024 Trends", views: 8000, author: "Chris Brown", date: "2024-01-02" },
];

const topCourses = [
    { title: "Full Stack Web Development", sales: 500, instructor: "Emily Davis", date: "2024-01-09" },
    { title: "React for Beginners", sales: 450, instructor: "Michael Scott", date: "2024-01-07" },
    { title: "JavaScript Mastery", sales: 400, instructor: "Pam Beesly", date: "2024-01-06" },
    { title: "Advanced CSS Techniques", sales: 380, instructor: "Dwight Schrute", date: "2024-01-04" },
    { title: "Node.js for Back-End Development", sales: 350, instructor: "Jim Halpert", date: "2024-01-03" },
];

const DashboardOverview: React.FC = () => {
    return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Top Blogs Box */}
                <div className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
                        <h3 className="font-semibold text-gray-700 inline-flex items-center">
                            Popular Blogs
                            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                             Total Views
                            </span>
                        </h3>
                    </div>
                    <ul className="space-y-4">
                        {topBlogs.map((blog, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center text-gray-700 relative group hover:bg-gray-50 p-2 rounded-lg"
                                data-tooltip-id={`tooltip-blog-${index}`}
                                data-tooltip-content={`Author: ${blog.author}`}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-blue-500 font-bold">{index + 1}</span>
                                    <span>{blog.title}</span>
                                </span>
                                <span className="flex items-center gap-1 text-gray-500">
                                    <i className="fas fa-eye"></i>
                                    {blog.views}
                                </span>
                                <Tooltip id={`tooltip-blog-${index}`} />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Top Courses Box */}
                <div className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-green-500">
                    <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
                        <h3 className="font-semibold text-gray-700 inline-flex items-center">
                            Top Courses
                            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                             Total Students
                            </span>
                        </h3>
                    </div>
                    <ul className="space-y-4">
                        {topCourses.map((course, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center text-gray-700 relative group hover:bg-gray-50 p-2 rounded-lg"
                                data-tooltip-id={`tooltip-course-${index}`}
                                data-tooltip-content={`Instructor: ${course.instructor}`}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-green-500 font-bold">{index + 1}</span>
                                    <span>{course.title}</span>
                                </span>
                                <span className="flex items-center gap-1 text-gray-500">
                                    <i className="fas fa-shopping-cart"></i>
                                    {course.sales}
                                </span>
                                <Tooltip id={`tooltip-course-${index}`} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
};

export default DashboardOverview;
