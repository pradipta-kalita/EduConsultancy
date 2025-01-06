import {profilePageResponse} from "@/types/profileResponse.ts";
import api from "@/utils/axiosInstance.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {getAccessToken} from "@/utils/getAccessToken.ts";
import {ApiResponse} from "@/types/ApiResponse.ts";

export const fetchProfileDetails = async (): Promise<
    ApiResponse<profilePageResponse>
> => {
    try {
        const response = await api.get(`/profile`, {
            headers: {
                Authorization: getAccessToken(),
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch payments."
            );
        }
        throw new Error("An unknown error occurred");
    }
};

export const findUserLocation = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          try {
            const { data }: AxiosResponse<any, any> = await axios.get(url);
            resolve(data.address.country);  // resolve the country here
          } catch (error) {
            reject("Error fetching location data");
          }
        },
        (error:any) => {
			console.log(error)
          reject("Error getting geolocation");
        }
      );
    } catch (e) {
      reject("Error fetching location...");
    }
  });
};
