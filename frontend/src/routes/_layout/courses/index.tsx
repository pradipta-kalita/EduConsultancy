import { useState } from "react";
import { useQuery,keepPreviousData } from "@tanstack/react-query";
import {createFileRoute, useNavigate} from "@tanstack/react-router";
import { CourseCard } from "@/components/CourseCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchCoursesPage } from "@/service/courses";
import { CourseSummary } from "@/types/courseTypes";
import {courseSearchSchema} from "@/schemas/courseSearchSchema.tsx";
import {zodValidator} from "@tanstack/zod-adapter";
import {Loader} from "@/components/Loader.tsx";


export const Route = createFileRoute("/_layout/courses/")({
  validateSearch: zodValidator(courseSearchSchema),
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  notFoundComponent: () => <div>Courses not found</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const {page,size,sort,order} = Route.useSearch()
  const { data, isLoading, isError } = useQuery({
      queryKey:["courses", page, size, sort, order],
      queryFn: ()=> fetchCoursesPage(page,size,order,sort),
      placeholderData: keepPreviousData,
  });

  if (isLoading) return <Loader/>;
  if (isError) return <div>Error loading courses.</div>;

  if (!data) {
    return <div>No data available</div>;
  }

  const { courses, totalPages } = data;
  // Function to update the URL and navigate to the correct page
  const paginate = (page: number) => {
    setCurrentPage(page);
    navigate({
      to: `?page=${page}&size=${size}&sort=${sort}&order=${order}`,
    });
  };

  return (
    <div className="px-4 pt-32 pb-14">
      <div className="container mx-auto max-w-6xl">
        <div className="py-8 text-3xl font-semibold text-gray-700">Courses</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {courses.map((course: CourseSummary) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href="#"
                  onClick={() => paginate(number)}
                  isActive={currentPage === number}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
