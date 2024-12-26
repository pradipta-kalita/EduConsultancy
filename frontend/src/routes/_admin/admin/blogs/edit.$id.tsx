import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogRequestSchema, BlogRequestDTO } from '@/schemas/createBlogSchema.tsx'; // Adjust path to your schema
import clsx from 'clsx';
import { useMutation, useQuery } from "@tanstack/react-query";
import {fetchAdminBlogById, updateBlog, fetchAllTags} from "@/service/blogs.ts"; // Add your services
import { useToast } from "@/hooks/use-toast.ts";
import { successToastColor } from "@/utils/toastColors.ts";
import {BlogResponse} from "@/types/blogTypes.ts";

export const Route = createFileRoute('/_admin/admin/blogs/edit/$id')({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<BlogRequestDTO>({
        resolver: zodResolver(BlogRequestSchema),
    });

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagClick = (tagId: string) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tagId)
                ? prevSelectedTags.filter((id) => id !== tagId)
                : [...prevSelectedTags, tagId]
        );
    };

    const {
        data: blogData,
        isLoading: isLoadingBlog,
        error: errorBlog,
    } = useQuery({
        queryKey: ["blogs", id],
        queryFn: () => fetchAdminBlogById(id),
        enabled: !!id,
    });

    const {
        data: tagsData,
        isLoading: isLoadingTags,
        error: errorTags,
    } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchAllTags,
    });

    const mutation = useMutation({
        mutationFn: updateBlog,
        onSuccess: (data: BlogResponse) => {
            console.log("Blog updated successfully:", data);
            reset({
                title: "",
                content: "",
                tagIds: [""],
                status: undefined,
            });
            toast({
                variant: "default",
                title: "Blog updated successfully",
                style: successToastColor,
            });
        },
        onError: (error) => {
            console.error("Error updating blog:", error);
            toast({
                variant: "destructive",
                title: "There was an error updating the blog.",
            });
        },
    });

    useEffect(() => {
        if (blogData) {
            // Set form default values
            reset({
                title: blogData.title,
                content: blogData.content,
                tagIds: blogData.tags.map((tag) => tag.id),
                status: blogData.status,
            });

            // Set selected tags
            setSelectedTags(blogData.tags.map((tag) => tag.id));
        }
    }, [blogData, reset]);

    useEffect(() => {
        setValue("tagIds", selectedTags as [string, ...string[]]);
    }, [selectedTags, setValue]);

    const onSubmit = (data: BlogRequestDTO) => {
        console.log("Form Submitted:", data);
        mutation.mutate({ data, id });
    };

    if (isLoadingBlog || isLoadingTags) {
        return <div>Loading...</div>;
    }

    if (errorBlog || errorTags) {
        return <div>There was an error. Please try again later.</div>;
    }

    if (!blogData) {
        return <div>Blog not found.</div>;
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                    Edit Blog Post
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            {...register("title")}
                            className={clsx(
                                "mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3",
                                errors.title && "border-red-500"
                            )}
                            placeholder="Enter blog title"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-lg font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            {...register("content")}
                            className={clsx(
                                "mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3",
                                errors.content && "border-red-500"
                            )}
                            rows={8}
                            placeholder="Write your blog content here..."
                        />
                        {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="tagIds" className="block text-lg font-medium text-gray-700">
                            Tags
                        </label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tagsData?.map((tag) => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    className={clsx(
                                        "px-4 py-2 rounded-full text-sm font-medium focus:outline-none",
                                        selectedTags.includes(tag.id)
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    )}
                                    onClick={() => handleTagClick(tag.id)}
                                >
                                    {tag.tagName}
                                </button>
                            ))}
                        </div>
                        {errors.tagIds && <p className="text-red-500 text-sm mt-2">{errors.tagIds.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            {...register("status")}
                            className={clsx(
                                "mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3",
                                errors.status && "border-red-500"
                            )}
                        >
                            <option value="">Select Status</option>
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-2">{errors.status.message}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-4 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Updating..." : "Update Blog Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

