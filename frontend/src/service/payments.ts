import {PaymentPageResponse} from "@/types/paymentTypes.ts";
import api from "@/utils/axiosInstance.ts";
import {AxiosError} from "axios";
import {getAccessToken} from "@/utils/getAccessToken.ts";
import {ApiResponse} from "@/types/ApiResponse.ts";

export const fetchPayments = async (
    page: number,
    size: number,
    order: "asc" | "desc",
    sort: "createdAt"
): Promise<ApiResponse<PaymentPageResponse>> => {
    try {
        const response = await api.get(
            `/admin/payments?page=${page-1}&size=${size}&order=${order}&sort=${sort}`,{
                headers : {
                    Authorization: getAccessToken()
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Failed to fetch payments.");
        }
        throw new Error("An unknown error occurred");
    }
};