import React, { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogRequestSchema, BlogRequestDTO } from '@/schemas/createBlogSchema.tsx'; // Adjust path to your schema
import clsx from 'clsx';
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBlog, fetchAllTags } from '@/service/blogs.ts';
import { openInNewTab } from '@/utils/openInNewTab.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { successToastColor } from '@/utils/toastColors.ts';
import {Button} from "@/components/ui/button.tsx";

export const Route = createFileRoute('/_admin/admin/blogs/create')({
  component: RouteComponent,
});

function RouteComponent() {
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
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleTagClick = (tagId: string) => {
    setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.includes(tagId)
            ? prevSelectedTags.filter((id) => id !== tagId)
            : [...prevSelectedTags, tagId]
    );
  };

  const { error, data, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchAllTags,
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      console.log('Blog created successfully:', data);
      openInNewTab(data.id);
      reset({
        title: '',
        content: '',
        tagIds: [''],
        status: undefined,
      });
      setSelectedTags([]);
      setImageUrl(null);
      toast({
        variant: "default",
        title: "Blog created successfully",
        style: successToastColor,
      });
    },
    onError: (error) => {
      console.error('Error creating blog:', error);
      toast({
        variant: "destructive",
        title: "There was an error creating blog.",
      });
    },
  });

  useEffect(() => {
    setValue('tagIds', selectedTags as [string, ...string[]]);
  }, [selectedTags, setValue]);

  const cloudName = "dfths157i";
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setImageUrl(null);
    }
  };

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
      setValue('imageUrl',data.secure_url);
    } catch{
      setIsUploading(false);
      toast({
        variant: "destructive",
        title: "Image upload failed",
      });
    }
  };

  const onSubmit = (data: BlogRequestDTO) => {
    if (!imageUrl) {
      return;
    }
    console.log('Form Submitted:', { ...data});
    mutation.mutate(data);
  };

  if (error) {
    return <div>There was some sort of error. Please try again.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && data?.length === 0) {
    return <p>No tags available</p>;
  }

  return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
            Create a New Blog Post
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
                {data?.map((tag) => (
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
              <label htmlFor="image" className="block text-lg font-medium text-gray-700">
                Upload Image
              </label>
              <div className="mt-2 flex items-center space-x-4">
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none"
                    onClick={() => document.getElementById('image')?.click()}
                >
                  Choose File
                </button>
                {previewUrl && (
                    <div className="relative w-16 h-16 rounded overflow-hidden shadow-md">
                      <img
                          src={previewUrl}
                          alt="Preview"
                          className="object-cover w-full h-full"
                      />
                    </div>
                )}
                {previewUrl && (
                    <button
                        type="button"
                        onClick={handleImageUpload}
                        disabled={isUploading}
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
                    >
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                )}
              </div>
              {errors.imageUrl && <p className="text-red-500 text-sm mt-2">{errors.imageUrl.message}</p>}
            </div>

            <div>
              <Button
                  type="submit"
                  className="w-full py-7 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={!imageUrl || mutation.isPending}
              >
                {mutation.isPending ? 'Submitting...' : 'Create Blog Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
}
