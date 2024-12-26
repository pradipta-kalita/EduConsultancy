import React from "react";
import {DollarSign, BookOpen, Star, User, FileText} from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard.tsx";

const CoursesDashboard: React.FC = () => {
    const cardData = [
        {
            title: "Sales This Month",
            value: "$12,345",
            icon: <DollarSign size={24} />,
            color: "bg-green-100",
            textColor: "text-green-600",
        },
        {
            title: "Total Courses Available",
            value: 120,
            icon: <BookOpen size={24} />,
            color: "bg-yellow-100",
            textColor: "text-yellow-600",
        },
        {
            title: "Top Instructor of the Month",
            value: "John Doe",
            icon: <User size={24} />,
            color: "bg-blue-100",
            textColor: "text-blue-600",
        },
        {
            title: "Average Course Rating",
            value: "4.7",
            icon: <Star size={24} />,
            color: "bg-purple-100",
            textColor: "text-purple-600",
        },
        {
            title: "Courses Published by You",
            value: 5,
            icon: <FileText size={24} />,
            color: "bg-red-100",
            textColor: "text-red-600",
        },
    ];

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-700 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-orange-600" />
                Course Management Dashboard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {cardData.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>
        </>
    );
};

export default CoursesDashboard;
