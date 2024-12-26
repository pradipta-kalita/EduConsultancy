import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CoursesList from "@/components/CoursesList.tsx";
import { courseSearchSchema } from "@/schemas/courseSearchSchema.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchCoursesPage } from "@/service/courses.ts";
import { zodValidator } from "@tanstack/zod-adapter";
import PrimaryButton from "@/components/Buttons/PrimaryButton.tsx";
import {Book} from "lucide-react";

export const Route = createFileRoute("/_admin/admin/courses/")({
  validateSearch: zodValidator(courseSearchSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { page = 1, size = 10, sort = "title", order = "asc" } = Route.useSearch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses", page, size, sort, order],
    queryFn: () => fetchCoursesPage(page, size, order, sort),
  });

  const handlePageChange = (newPage: number) => {
    navigate({
      to: `?page=${newPage}&size=${size}&sort=${sort}&order=${order}`,
    });
  };

  return (
      <div className="container mx-auto px-4 py-6">
        {/* Header with Title and Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold flex items-center space-x-2">
            <Book className="w-5 h-5 text-purple-600"/>
            <span>Courses</span>
          </h2>
          <PrimaryButton
              className="hover:bg-purple-100 hover:text-purple-600"
              onClick={() => navigate({to: '/admin/courses/create'})}
          >
            + New Course
          </PrimaryButton>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow p-4">
          {isLoading && (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-gray-600 text-center">Loading courses...</div>
              </div>
          )}

          {isError && (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-red-600 text-center">
                  Failed to load courses. Please try again later.
                </div>
              </div>
          )}

          {!isLoading && !isError && (!data || data.courses.length === 0) && (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-gray-600 text-center">
                  No courses found. Start by creating a new course.
                </div>
              </div>
          )}

          {!isLoading && !isError && data && data.courses.length > 0 && (
              <>
                <CoursesList courses={data.courses} />
                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                  <button
                      onClick={() => handlePageChange(data.currentPage - 1)}
                      disabled={!data.hasPrevious}
                      className={`px-4 py-2 border rounded-lg ${
                          !data.hasPrevious ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: data.totalPages }, (_, i) => (
                      <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`mx-1 px-4 py-2 border rounded-lg ${
                              data.currentPage === i + 1
                                  ? "bg-purple-600 text-white"
                                  : "hover:bg-gray-200"
                          }`}
                      >
                        {i + 1}
                      </button>
                  ))}
                  <button
                      onClick={() => handlePageChange(data.currentPage + 1)}
                      disabled={!data.hasNext}
                      className={`px-4 py-2 border rounded-lg ${
                          !data.hasNext ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    Next
                  </button>
                </div>
              </>
          )}
        </div>
      </div>
  );
}

export default RouteComponent;
