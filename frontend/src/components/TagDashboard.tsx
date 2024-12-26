import React from "react";
import { Tag, TrendingUp, CheckCircle, Layers, List } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";

const TagsDashboard: React.FC = () => {
    const cardData = [
        {
            title: "Total Tags",
            value: 300,
            icon: <Tag size={24} />,
            color: "bg-blue-100",
            textColor: "text-blue-600",
        },
        {
            title: "Tags Added This Month",
            value: 45,
            icon: <TrendingUp size={24} />,
            color: "bg-green-100",
            textColor: "text-green-600",
        },
        {
            title: "Most Popular Tag",
            value: "Education",
            icon: <CheckCircle size={24} />,
            color: "bg-yellow-100",
            textColor: "text-yellow-600",
        },
        {
            title: "Tags Associated with Courses",
            value: 250,
            icon: <Layers size={24} />,
            color: "bg-purple-100",
            textColor: "text-purple-600",
        },
        {
            title: "Tags Pending Review",
            value: 10,
            icon: <List size={24} />,
            color: "bg-red-100",
            textColor: "text-red-600",
        },
    ];

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-700 flex items-center">
                <Tag className="w-6 h-6 mr-3 text-blue-600" />
                Tag Management Dashboard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardData.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>
        </>
    );
};

export default TagsDashboard;
