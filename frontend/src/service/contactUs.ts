import axios from "@/utils/axiosInstance.ts";
import {ContactUsPage, ContactUsResponse} from "@/types/contactUsTypes.ts";
import {getAccessToken} from "@/utils/getAccessToken.ts";
export const fetchContactUsPage = async (
    page: number,
    size: number,
    order: string,
    sort: string
): Promise<ContactUsPage> => {
    const response = await axios.get(`/admin/contactus`, {
        params: {
            page: page - 1, // page starts from 0, so subtract 1
            size,
            order,
            sortBy: sort,
        },
        headers:{
            Authorization:getAccessToken(),
        }
    });

    return response.data;
};

export const contactUsResponseQuery = (contactUsId: string): { queryKey: string[]; queryFn: () => Promise<ContactUsResponse> } => ({
    queryKey: ['contactus', contactUsId],
    queryFn: async () => {
        const response = await axios.get(`/admin/contactus/${contactUsId}`, {
            headers: {
                Authorization: getAccessToken(),
            },
        });
        if (!response.data) {
            throw new Error(`Feedback with ID ${contactUsId} not found`);
        }
        return response.data;
    },
});
