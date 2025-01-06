import { profilePageResponse } from "@/types/profileResponse.ts";
import api from "@/utils/axiosInstance.ts";
import { AxiosError } from "axios";
import { getAccessToken } from "@/utils/getAccessToken.ts";
import { ApiResponse } from "@/types/ApiResponse.ts";

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

export const findUserLocation = async () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				console.log(latitude, longitude);
			},
			(error) => {
				console.error("Error get user location: ", error);
			}
		);
	} else {
		console.log("Geolocation is not supported by this browser");
	}
};


// const[(userLocation, setUserLocation)] = useState<{
// 	latitude: number;
// 	longitude: number;
// } | null>(null);
