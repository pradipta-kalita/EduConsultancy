import { DashboardCard } from "@/components/DashboardCard.tsx";
import React from "react";
import {BookOpen, DollarSign, FileText, Users, MessageCircle, Gauge} from "lucide-react"; // Added a new icon for feedback

const DashboardCards: React.FC = () => {
    const cardData = [
        { title: "Total Students", value: 1234, icon: <Users size={24} />, color: "bg-blue-100", textColor: "text-blue-600" },
        { title: "Revenue", value: "₹54,321", icon: <DollarSign size={24} />, color: "bg-green-100", textColor: "text-green-600" },
        { title: "Total Courses", value: 42, icon: <BookOpen size={24} />, color: "bg-yellow-100", textColor: "text-yellow-600" },
        { title: "Total Blogs", value: 156, icon: <FileText size={24} />, color: "bg-purple-100", textColor: "text-purple-600" },
        { title: "Feedbacks", value: 22, icon: <MessageCircle size={24} />, color: "bg-red-100", textColor: "text-red-600" }, // New icon and color for feedback
    ];

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-700 flex items-center">
                <Gauge className="w-6 h-6 mr-3 text-orange-600"/>
                Dashboard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {cardData.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>
        </>
    );
};

export default DashboardCards;
