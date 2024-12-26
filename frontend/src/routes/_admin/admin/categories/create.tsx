import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { createCategory } from '@/service/courses.ts'; // Replace with your actual service
import { createCategorySchema, CategoryRequestDTO } from '@/schemas/createCategorySchema.tsx';
import { useToast } from '@/hooks/use-toast.ts';

export const Route = createFileRoute('/_admin/admin/categories/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryRequestDTO>({
    resolver: zodResolver(createCategorySchema),
  });

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      reset(); // Reset the form fields
      toast({
        variant: 'default',
        title: 'Category created successfully',
        style: {
          backgroundColor: 'green',
          color: 'white',
          border: '1px solid darkgreen',
          padding: '14px',
          borderRadius: '8px',
        },
      });
    },
    onError: (error) => {
      console.error('Error creating category:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to create category',
        style: {
          backgroundColor: 'red',
          color: 'white',
          border: '1px solid darkred',
          padding: '14px',
          borderRadius: '8px',
        },
      });
    },
  });

  const onSubmit = (data: CategoryRequestDTO) => {
    mutation.mutate(data);
  };

  return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
            Create a New Category
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Category Name
              </label>
              <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={clsx(
                      'mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3',
                      errors.name && 'border-red-500'
                  )}
                  placeholder="Enter category name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
            </div>

            {/* Summary Field */}
            <div>
              <label htmlFor="summary" className="block text-lg font-medium text-gray-700">
                Category Summary
              </label>
              <textarea
                  id="summary"
                  {...register('summary')}
                  className={clsx(
                      'mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3',
                      errors.summary && 'border-red-500'
                  )}
                  placeholder="Enter category summary"
              />
              {errors.summary && <p className="text-red-500 text-sm mt-2">{errors.summary.message}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                  type="submit"
                  className="w-full py-4 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={mutation.isPending} // Disable while submitting
              >
                {mutation.isPending ? 'Submitting...' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default RouteComponent;
