import { createFileRoute, Link } from '@tanstack/react-router';
import CategoriesTable from "@/components/CategoriesTable.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "@/service/courses.ts";
import PrimaryButton from "@/components/Buttons/PrimaryButton.tsx";
import {FolderOpen} from "lucide-react";


export const Route = createFileRoute('/_admin/admin/categories/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
  });

  return (
      <div className="container mx-auto px-4 py-6">
        {/* Header with Title and Button */}
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold flex items-center space-x-2">
                  <FolderOpen className="w-5 h-5 text-purple-600"/>
                  <span>Categories</span>
              </h2>
              <Link to={'/admin/categories/create'}>
                  <PrimaryButton className="hover:bg-purple-100 hover:text-purple-600">
                      + New Category
                  </PrimaryButton>
              </Link>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-lg shadow p-4">
              {isLoading && (
                  <div className="flex items-center justify-center min-h-[200px]">
                  <div className="text-gray-600 text-center">Loading categories...</div>
              </div>
          )}

          {error && (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-red-600 text-center">
                  Failed to load categories. Please try again later.
                </div>
              </div>
          )}

          {!isLoading && !error && (!data || data.length === 0) && (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-gray-600 text-center">
                  No categories found. Start by creating a new category.
                </div>
              </div>
          )}

          {!isLoading && !error && data && data.length > 0 && (
              <CategoriesTable categories={data} />
          )}
        </div>
      </div>
  );
}

export default RouteComponent;
