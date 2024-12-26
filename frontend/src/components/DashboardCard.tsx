import React from "react";

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string; // Added color prop
    textColor: string; // Added text color prop
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color, textColor }) => (
    <div
        className={`bg-white bg-opacity-80 rounded-tl-lg rounded-tr-none rounded-bl-none rounded-br-lg shadow-md p-6 flex items-center space-x-4 transition duration-300 ease-in-out transform hover:scale-105`}
    >
        <div className={`p-3 rounded-full ${color} ${textColor}`}>
            {icon}
        </div>
        <div>
            <p className={`text-gray-500 text-sm font-medium ${textColor}`}>{title}</p>
            <p className={`text-2xl font-semibold text-gray-700`}>{value}</p>
        </div>
    </div>
);

