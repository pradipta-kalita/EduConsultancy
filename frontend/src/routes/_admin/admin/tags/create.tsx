import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { createTag } from '@/service/blogs.ts';
import { TagRequestSchema, TagRequestDTO } from '@/schemas/createTagSchema.tsx';
import {useToast} from "@/hooks/use-toast.ts";

export const Route = createFileRoute('/_admin/admin/tags/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const {toast} = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TagRequestDTO>({
    resolver: zodResolver(TagRequestSchema),
  });

  const mutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      reset({ tagname: '' });
      toast({
        variant: "default",
        title: "Tag created successfully",
        style:{
          backgroundColor: "green",
          color: "white",
          border: "1px solid darkgreen",
          padding: "14px",
          borderRadius: "8px",
        },

      })
    },
    onError: (error) => {
      console.error('Error creating tag:', error);
      // Handle error state here if needed
    },
  });

  const onSubmit = (data: TagRequestDTO) => {
    console.log('Form Submitted:', data);
    mutation.mutate(data);
  };

  return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
            Create a New Tag
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Tag Name Field */}
            <div>
              <label htmlFor="tagName" className="block text-lg font-medium text-gray-700">
                Tag Name
              </label>
              <input
                  type="text"
                  id="tagName"
                  {...register('tagname')}
                  className={clsx(
                      'mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-3',
                      errors.tagname && 'border-red-500'
                  )}
                  placeholder="Enter tag name"
              />
              {errors.tagname && <p className="text-red-500 text-sm mt-2">{errors.tagname.message}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                  type="submit"
                  className="w-full py-4 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={mutation.isPending} // Disable while submitting
              >
                {mutation.isPending ? 'Submitting...' : 'Create Tag'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
