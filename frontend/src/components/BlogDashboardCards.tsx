import React from "react";
import { FileText, Eye, Edit3, PenTool, Users } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard.tsx";

const BlogDashboardCards: React.FC = () => {
    const cardData = [
        {
            title: "Total Blogs Published",
            value: 45,
            icon: <FileText size={24} />,
            color: "bg-blue-100",
            textColor: "text-blue-600",
        },
        {
            title: "Total Blog Views",
            value: "24,678",
            icon: <Eye size={24} />,
            color: "bg-green-100",
            textColor: "text-green-600",
        },
        {
            title: "Draft Blogs",
            value: 10,
            icon: <Edit3 size={24} />,
            color: "bg-yellow-100",
            textColor: "text-yellow-600",
        },
        {
            title: "Top Blog Author",
            value: "Alice Smith",
            icon: <PenTool size={24} />,
            color: "bg-purple-100",
            textColor: "text-purple-600",
        },
        {
            title: "Active Subscribers",
            value: 1_234,
            icon: <Users size={24} />,
            color: "bg-red-100",
            textColor: "text-red-600",
        },
    ];

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-700 flex items-center mb-6">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Blog Management Dashboard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardData.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>
        </>
    );
};

export default BlogDashboardCards;
