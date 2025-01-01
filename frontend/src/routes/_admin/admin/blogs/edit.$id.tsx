import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogRequestSchema, BlogRequestDTO } from '@/schemas/createBlogSchema.tsx';
import clsx from 'clsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchAdminBlogById, updateBlog, fetchAllTags } from '@/service/blogs.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { successToastColor } from '@/utils/toastColors.ts';
import { BlogResponse } from '@/types/blogTypes.ts';
import {Button} from "@/components/ui/button.tsx";

export const Route = createFileRoute('/_admin/admin/blogs/edit/$id')({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();
    const { toast } = useToast();

    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const cloudName = "dfths157i"; // Replace with your Cloudinary cloud name

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

    const { data: blogData, isLoading: isLoadingBlog, error: errorBlog } = useQuery({
        queryKey: ['blogs', id],
        queryFn: () => fetchAdminBlogById(id),
        enabled: !!id,
    });

    const { data: tagsData, isLoading: isLoadingTags, error: errorTags } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchAllTags,
    });

    const mutation = useMutation({
        mutationFn: updateBlog,
        onSuccess: (data: BlogResponse) => {
            console.log(data);
            toast({
                variant: 'default',
                title: 'Blog updated successfully',
                style: successToastColor,
            });
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'There was an error updating the blog.',
            });
        },
    });

    useEffect(() => {
        if (blogData) {
            reset({
                title: blogData.title,
                content: blogData.content,
                tagIds: blogData.tags.map((tag) => tag.id),
                status: blogData.status,
                imageUrl: blogData.imageUrl,
            });
            setImageUrl(blogData.imageUrl);
            setSelectedTags(blogData.tags.map((tag) => tag.id));
        }
    }, [blogData, reset]);

    useEffect(() => {
        setValue('tagIds', selectedTags as [string, ...string[]]);
    }, [selectedTags, setValue]);

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    const handleImageUpload = async () => {
        if (!image) {
            return;
        }

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'demo_app'); // Replace with your Cloudinary upload preset

        try {
            setIsUploading(true);
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const data = await response.json();
            setIsUploading(false);
            setImageUrl(data.secure_url);
            setValue('imageUrl', data.secure_url);
        } catch {
            setIsUploading(false);
            toast({
                variant: 'destructive',
                title: 'Image upload failed',
            });
        }
    };

    const onSubmit = (data: BlogRequestDTO) => {
        if (!imageUrl) {
            return;
        }
        mutation.mutate({ data, id });
    };

    if (isLoadingBlog || isLoadingTags) {
        return <div>Loading...</div>;
    }

    if (errorBlog || errorTags) {
        return <div>{`Error: ${errorBlog?.message || errorTags?.message}`}</div>;
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
                            {...register('title')}
                            className={clsx(
                                'mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3',
                                errors.title && 'border-red-500'
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
                            {...register('content')}
                            className={clsx(
                                'mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3',
                                errors.content && 'border-red-500'
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
                                        'px-4 py-2 rounded-full text-sm font-medium focus:outline-none',
                                        selectedTags.includes(tag.id)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                            {...register('status')}
                            className={clsx(
                                'mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3',
                                errors.status && 'border-red-500'
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
                        <label className="block text-lg font-medium text-gray-700">Image</label>
                        <div className="mt-2 flex flex-col items-center">
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-w-full h-auto mb-4 rounded-md shadow-md"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files && setImage(e.target.files[0])}
                            />
                            <button
                                type="button"
                                onClick={handleImageUpload}
                                disabled={isUploading}
                                className="mt-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                            >
                                {isUploading ? 'Uploading...' : 'Upload Image'}
                            </button>
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="w-full py-4 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={mutation.isPending || !imageUrl || isUploading}
                        >
                            {mutation.isPending ? 'Updating...' : 'Update Blog Post'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RouteComponent;
