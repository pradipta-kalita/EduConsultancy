import api from "@/utils/axiosInstance";
import {AxiosError} from "axios";
import {BlogAdminResponse, BlogPageResponse, BlogResponse, TagResponse, TagSummary} from "@/types/blogTypes.ts";
import {BlogRequestDTO} from "@/schemas/createBlogSchema.tsx";
import {getAccessToken} from "@/utils/getAccessToken.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TagRequestDTO} from "@/schemas/createTagSchema.tsx";

/////////////////////////////////////////////////////
///////////////////Functions for blogs///////////////
/////////////////////////////////////////////////////

export const fetchBlogsForAdmin = async (
    page: number,
    size: number,
    order: "asc" | "desc",
    sort: "title" | "publishedAt"
): Promise<BlogPageResponse> => {
    try {
        const response = await api.get(
            `/admin/blogs?page=${page-1}&size=${size}&order=${order}&sort=${sort}`
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
};

export const fetchBlogsByTagId = async (page:number,tagId:string):Promise<BlogPageResponse>=>{
    try {
        const response = await api.get(
            `/tags/${tagId}/blogs?page=${page}`,
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
}

export const fetchBlogs = async (
    page: number,
): Promise<BlogPageResponse> => {
    try {
        const response = await api.get(
            `/blogs?page=${page}`
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
};



export const blogQueryOptions = (blogId: string): { queryKey: string[]; queryFn: () => Promise<BlogResponse> } => ({
    queryKey: ['blogs', blogId],
    queryFn: async () => {
        const response = await api.get(`/blogs/${blogId}`);
        if (!response.data) {
            throw new Error(`Post with ID ${blogId} not found`);
        }
        return response.data;
    },
});

export const fetchBlogById = async (id: string): Promise<BlogResponse> => {
    try {
        const response = await api.get(`/blogs/${id}`, {
            headers: {
                Authorization: getAccessToken(),
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Handle Axios-specific error
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
}

export const fetchAdminBlogById = async (id: string): Promise<BlogAdminResponse> => {
    try {
        const response = await api.get(`/admin/blogs/${id}`, {
            headers: {
                Authorization: getAccessToken(),
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Handle Axios-specific error
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
}

export const createBlog = async (data: BlogRequestDTO):Promise<BlogResponse> => {
    try {
        const response = await api.post(`/admin/blogs`,data, {
            headers: {
                Authorization: getAccessToken(),
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Handle Axios-specific error
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
}

export const updateBlog = async ({ data, id }: { data: BlogRequestDTO; id: string }): Promise<BlogResponse> => {
    try {
        const response = await api.put(`/admin/blogs/${id}`, data, {
            headers: {
                Authorization: getAccessToken(),
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "Failed to update blog");
        }
        throw new Error("An unknown error occurred");
    }
};


export const deleteBlog = async (id:string):Promise<void> => {
    try {
        const response = await api.delete(`/admin/blogs/${id}`, {
            headers: {
                Authorization: getAccessToken(),
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Handle Axios-specific error
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
}

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['blogs']});
        },
    });
};
/////////////////////////////////////////////////////////////
///////////////////////  Tags functions  ////////////////////
/////////////////////////////////////////////////////////////
export const fetchAllTags = async():Promise<TagSummary[]>=>{
    try {
        const response = await api.get(`/tags`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Handle Axios-specific error
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
}

const deleteTag = async (id: string):Promise<void> => {
    try {
        const response = await api.delete(`/admin/tags/${id}`, {
            headers: {
                Authorization: getAccessToken(),
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Handle Axios-specific error
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
}

export const createTag = async (data: TagRequestDTO):Promise<TagResponse> => {
    try {
        const response = await api.post(`/admin/tags`,data, {
            headers: {
                Authorization: getAccessToken(),
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Handle Axios-specific error
            throw new Error(error.response?.data?.message || "Failed to fetch blogs");
        }
        throw new Error("An unknown error occurred");
    }
}

export const useDeleteTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTag,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tags']});
        },
    });
};