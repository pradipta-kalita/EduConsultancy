import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCourse, fetchAllCategories } from '@/service/courses.ts'; // Update paths as needed
import { useNavigate } from '@tanstack/react-router';
import { CourseRequestDTO, createCourseSchema } from '@/schemas/createCourseSchema.tsx';
import { CourseStatus } from '@/types/courseTypes.ts';
import React, { useState } from 'react';
import { successToastColor } from '@/utils/toastColors.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { Button } from '@/components/ui/button.tsx';

export const Route = createFileRoute('/_admin/admin/courses/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseRequestDTO>({
    resolver: zodResolver(createCourseSchema),
  });

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: categories, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
  });

  const mutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      navigate({
        to: '/admin/courses',
        search: {
          page: 1,
          sort: 'title',
          order: 'asc',
          size: 9,
        },
      });
      toast({
        variant: 'default',
        title: 'Course created successfully',
        style: successToastColor,
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'There was an error creating the course.',
      });
      console.error('Error creating course:', error);
    },
  });

  const cloudName = 'dfths157i';

  const handleImageUpload = async () => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'demo_app'); // Replace with your Cloudinary preset or other service

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
        title: 'There was an error uploading the image.',
      });
    }
  };

  const onSubmit = (data: CourseRequestDTO) => {
    if (!imageUrl) {
      alert('Please upload an image before submitting.');
      return;
    }

    const payload = {
      ...data,
      imageUrl,
    };

    mutation.mutate(payload);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading categories. Please try again later.</p>;
  }

  return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Create a New Course</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
                {...register('title')}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
                {...register('description')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <input
                {...register('summary')}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.summary && <p className="text-sm text-red-600">{errors.summary.message}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
                {...register('status')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value={CourseStatus.INACTIVE}>Inactive</option>
              <option value={CourseStatus.ACTIVE}>Active</option>
            </select>
            {errors.status && <p className="text-sm text-red-600">{errors.status.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
                {...register('categoryId')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-sm text-red-600">{errors.categoryId.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Image</label>
            <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Preview:</p>
                  <img
                      src={imagePreview}
                      alt="Image preview"
                      className="w-48 h-32 object-cover border border-gray-300 rounded-md"
                  />
                </div>
            )}
            <button
                type="button"
                onClick={handleImageUpload}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
                disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {imageUrl && (
                <p className="text-sm text-green-600 mt-2">Image uploaded successfully!</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
              disabled={isSubmitting || mutation.isPending || !imageUrl}
          >
            {isSubmitting || mutation.isPending ? 'Creating...' : 'Create Course'}
          </Button>
        </form>
      </div>
  );
}
