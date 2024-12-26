import axios from "@/utils/axiosInstance";
import {CourseResponse, CoursePageResponse, CategoryResponse, AdminCourseResponse} from "@/types/courseTypes.ts";
import api from "@/utils/axiosInstance";
import {getAccessToken} from "@/utils/getAccessToken.ts";
import {AxiosResponse} from "axios";
import {CourseRequestDTO} from "@/schemas/createCourseSchema.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CategoryRequestDTO} from "@/schemas/createCategorySchema.tsx";

/// TO FETCH SINGLE COURSE USING COURSE ID
export const courseQueryOptions = (courseId: string): { queryKey: string[]; queryFn: () => Promise<CourseResponse> } => ({
    queryKey: ['courses', courseId],
    queryFn: async () => {
        const response = await axios.get(`/courses/${courseId}`);
        if (!response.data) {
            throw new Error(`Post with ID ${courseId} not found`);
        }
        return response.data;
    },
});

export const createCourse = async (data: CourseRequestDTO):Promise<CourseResponse> => {
    try {
        const response = await api.post(
            `/admin/courses`,
            data, // Wrap `productId` in an object
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating order ID:", error);
        throw new Error("An unknown error occurred");
    }
}

export const updateCourse = async (id:string,data: CourseRequestDTO):Promise<CourseResponse> => {
    try {
        const response = await api.put(
            `/admin/courses/${id}`,
            data,
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating order ID:", error);
        throw new Error("An unknown error occurred");
    }
}
export const fetchCourseById = async (id: string):Promise<AdminCourseResponse> => {
    try {
        const response = await api.get(
            `/admin/courses/${id}`,
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error getting order ID:", error);
        throw new Error("An unknown error occurred");
    }
}

const deleteCourse = async (id: string):Promise<void> => {
    try {
         await api.delete(
            `/admin/courses/${id}`,
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
    } catch (error) {
        console.error("Error deleting course with id:", id);
        console.error(`An unknown error occurred while deleting. ${error}`);
        throw new Error("An unknown error occurred");
    }
}

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['courses']});
        },
    });
};

export const fetchCoursesPage = async (
    page: number,
    size: number,
    order: string,
    sort: string
  ): Promise<CoursePageResponse> => {
    const response = await axios.get(`/courses`, {
      params: {
        page: page - 1, // page starts from 0, so subtract 1
        size,
        order,
        sortBy: sort,
      },
    });
  
    return response.data; // Only return the data part
  };
////////////////////////////////////////////////////////////
///////////////// Course CATEGORY FUNCTIONS ////////////////
////////////////////////////////////////////////////////////

export const fetchAllCategories = async ():Promise<CategoryResponse[]> => {
    try {
        const response = await api.get(
            `/categories`,
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
        return response.data;
    } catch {
        console.error("Error getting categories.");
        throw new Error("An unknown error occurred");
    }
}

export const createCategory = async (data: CategoryRequestDTO):Promise<CategoryResponse> => {
    try {
        const response = await api.post(
            `/admin/categories`,
            data,
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
        return response.data;
    } catch {
        console.error("Error creating category.");
        throw new Error("An unknown error occurred");
    }
}

export const updateCategory = async (id: string, data: CategoryRequestDTO):Promise<CategoryResponse> => {
    try {
        const response = await api.put(
            `/admin/categories/${id}`,
            data,
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
        return response.data;
    } catch {
        console.error("Error creating category.");
        throw new Error("An unknown error occurred");
    }
}

export const fetchCategoryById = async (id: string):Promise<CategoryResponse> => {
    try {
        const response = await api.get(
            `/categories/${id}`,
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
        return response.data;
    } catch {
        console.error("Error creating category.");
        throw new Error("An unknown error occurred");
    }
}

const deleteCategory = async (id: string):Promise<void> => {
    try {
        const response = await api.delete(
            `/admin/categories/${id}`,
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
        return response.data;
    } catch {
        console.error("Error deleting category.");
        throw new Error("An unknown error occurred");
    }
}
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['categories']});
        },
    });
};

////////////////////////////////////////////////////////////
/////////////////////// PAYMENT FUNCTIONS //////////////////
////////////////////////////////////////////////////////////
export const createOrderId = async (productId: string): Promise<string> => {
    try {
        const response = await api.post(
            `/payments/create`,
            { productId }, // Wrap `productId` in an object
            {
                headers: {
                    Authorization: getAccessToken(),
                    'Content-Type': 'application/json', // Ensure the Content-Type is application/json
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error creating order ID:", error);
        throw new Error("An unknown error occurred");
    }
};

export const verifyOrder  = async (data: any): Promise<AxiosResponse> => {
    try{
        return await api.post(`/payments/verify`, data, {
            headers: {
                Authorization: getAccessToken(),
            }
        });
    }catch(error){
        console.log(error);
        throw new Error("An unknown error occurred");
    }
}