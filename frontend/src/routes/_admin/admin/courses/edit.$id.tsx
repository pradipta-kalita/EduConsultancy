import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchAllCategories, fetchCourseById, updateCourse } from '@/service/courses.ts'; // Update paths as needed
import { useNavigate } from '@tanstack/react-router';
import { CourseRequestDTO, createCourseSchema } from '@/schemas/createCourseSchema.tsx';
import { CourseStatus } from '@/types/courseTypes.ts';
import React, { useEffect, useState } from 'react';

export const Route = createFileRoute('/_admin/admin/courses/edit/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
  });

  const { data: courseDetails, isLoading: isCourseLoading, error: courseError } = useQuery({
    queryKey: ['course', id],
    queryFn: () => fetchCourseById(id),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CourseRequestDTO>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: courseDetails,
  });

  useEffect(() => {
    if (courseDetails) {
      Object.entries(courseDetails).forEach(([key, value]) => {
        setValue(key as keyof CourseRequestDTO, value);
      });
      setImagePreview(courseDetails.imageUrl || null);
    }
  }, [courseDetails, setValue]);

  const mutation = useMutation({
    mutationFn: (updatedCourse: CourseRequestDTO) => updateCourse(id, updatedCourse),
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
    },
    onError: (error) => {
      console.error('Error updating course:', error);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = (data: CourseRequestDTO) => {
    mutation.mutate(data);
  };

  if (isCourseLoading || isCategoriesLoading) {
    return <p>Loading...</p>;
  }

  if (courseError || categoriesError) {
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Edit Course</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
                {...register('title')}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
                {...register('description')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <input
                {...register('summary')}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.summary && <p className="text-sm text-red-600">{errors.summary.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Course Preview" className="w-full max-h-60 object-cover" />
                </div>
            )}
          </div>

          <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
              disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? 'Updating...' : 'Update Course'}
          </button>
        </form>
      </div>
  );
}
