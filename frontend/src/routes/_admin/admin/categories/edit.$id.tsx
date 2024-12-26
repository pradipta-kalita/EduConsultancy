import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchCategoryById, updateCategory } from '@/service/courses.ts'; // Update paths as needed
import { useNavigate } from '@tanstack/react-router';
import { CategoryRequestDTO, createCategorySchema } from '@/schemas/createCategorySchema.tsx';
import { useEffect } from 'react';

export const Route = createFileRoute('/_admin/admin/categories/edit/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { id } = Route.useParams(); // Fetch ID from URL

  // Query for fetching category details
  const {
    data: categoryDetails,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ['categories', id],
    queryFn: () => fetchCategoryById(id),
  });

  // React Hook Form setup with Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CategoryRequestDTO>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: categoryDetails, // Set default values when data is available
  });

  // Update form values when categoryDetails are loaded
  useEffect(() => {
    if (categoryDetails) {
      Object.entries(categoryDetails).forEach(([key, value]) => {
        setValue(key as keyof CategoryRequestDTO, value);
      });
    }
  }, [categoryDetails, setValue]);

  // Mutation for updating a category
  const mutation = useMutation({
    mutationFn: (updatedCategory: CategoryRequestDTO) => updateCategory(id, updatedCategory),
    onSuccess: () => {
      navigate({
        to: '/admin/categories',
      });
    },
    onError: (error) => {
      console.error('Error updating category:', error);
    },
  });

  // Submit handler
  const onSubmit = (data: CategoryRequestDTO) => {
    mutation.mutate(data);
  };

  if (isCategoryLoading) {
    return <p>Loading...</p>;
  }

  if (categoryError) {
    return <p>Error loading category data. Please try again later.</p>;
  }

  return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Edit Category</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
                {...register('name')}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <textarea
                {...register('summary')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.summary && <p className="text-sm text-red-600">{errors.summary.message}</p>}
          </div>

          <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
              disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? 'Updating...' : 'Update Category'}
          </button>
        </form>
      </div>
  );
}
