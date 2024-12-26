import {FeedbackPage, FeedbackResponse} from "@/types/feedbackTypes.ts";
import axios from "@/utils/axiosInstance.ts";
import {getAccessToken} from "@/utils/getAccessToken.ts";

export const fetchFeedbackPage = async (
    page: number,
    size: number,
    order: string,
    sort: string
): Promise<FeedbackPage> => {
    const response = await axios.get(`/admin/feedbacks`, {
        params: {
            page: page - 1, // page starts from 0, so subtract 1
            size,
            order,
            sortBy: sort,
        },
        headers:{
            Authorization: getAccessToken(),
        }
    });

    return response.data;
};



export const feedbackResponseQuery = (feedbackId: string): { queryKey: string[]; queryFn: () => Promise<FeedbackResponse> } => ({
    queryKey: ['feedbacks', feedbackId],
    queryFn: async () => {
        const response = await axios.get(`/admin/feedbacks/${feedbackId}`, {
            headers: {
                Authorization: getAccessToken(),
            },
        });
        if (!response.data) {
            throw new Error(`Feedback with ID ${feedbackId} not found`);
        }
        return response.data;
    },
});

