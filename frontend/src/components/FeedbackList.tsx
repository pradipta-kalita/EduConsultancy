import React from "react";
import {MessageCircleHeart, Star} from "lucide-react";
import dayjs from "dayjs";
import {FeedbackSummary} from "@/types/feedbackTypes.ts";
import {Link} from "@tanstack/react-router";

interface FeedbackListProps {
    feedbacks: FeedbackSummary[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl flex gap-1 font-bold text-gray-700 mb-4">
                <MessageCircleHeart size={24} color="lightcoral"/>
                Feedbacks
            </h2>

            <div>
                {feedbacks.map((feedback, index) => (
                    <Link to={'/admin/feedback/$id'} params={{id: feedback.id}} key={feedback.id}>
                        <div className="py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <Star size={16}/>
                                        <span className="font-semibold">{feedback.rating.toFixed(1)}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">{feedback.name}</h3>
                                        <p className="text-sm text-gray-500">{feedback.email}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">
                                    {dayjs(feedback.createdAt).format("MMM DD, YYYY")}
                                </p>
                            </div>
                            <p className="text-gray-600 mt-2">{feedback.summary}</p>
                            {index < feedbacks.length - 1 && <hr className="my-4 border-gray-200"/>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeedbackList;
