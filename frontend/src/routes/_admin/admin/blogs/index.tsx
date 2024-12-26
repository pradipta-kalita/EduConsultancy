import { createFileRoute, useNavigate } from "@tanstack/react-router";
import BlogDashboardCards from "@/components/BlogDashboardCards.tsx";
import BlogList from "@/components/BlogList.tsx";
import {blogSearchSchema, isOrderField, isSortField} from "@/schemas/blogSearchSchema.tsx";
import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchBlogsForAdmin} from "@/service/blogs.ts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {zodValidator} from "@tanstack/zod-adapter";

export const Route = createFileRoute("/_admin/admin/blogs/")({
  validateSearch: zodValidator(blogSearchSchema),
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  notFoundComponent: () => <div>Blogs not found</div>,
  component: RouteComponent,
});

type Filters = {
  page: number;
  size: number;
  sort: "title" | "publishedAt";
  order: "asc" | "desc";
};


function RouteComponent() {
  const navigate = useNavigate();
  const searchParams = Route.useSearch();
  const [filters, setFilters] = useState<Filters>({
    page: searchParams.page || 1,
    size: searchParams.size || 10,
    sort: isSortField(searchParams.sort) ? searchParams.sort : "publishedAt",
    order: isOrderField(searchParams.order) ? searchParams.order : "asc",
  });



  // Synchronize state and URL
  useEffect(() => {
    navigate({
      to: `?page=${filters.page}&size=${filters.size}&sort=${filters.sort}&order=${filters.order}`,
      replace: true,
    });
  }, [filters, navigate]);


  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs", filters.page, filters.size, filters.sort, filters.order],
    queryFn: () => fetchBlogsForAdmin(filters.page, filters.size, filters.order, filters.sort),
    placeholderData: keepPreviousData,
  });



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs.</div>;

  if (!data) {
    return <div>No data available</div>;
  }


  const { blogs, totalPages } = data;

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };


  // @ts-ignore
  return (
      <>
        {/* Blog Dashboard */}
        <BlogDashboardCards />

        {/* Blog List with Filters */}
        <BlogList
            blogs={blogs}
            pageSize={filters.size}
            setPageSize={(size) => handleFilterChange({ size, page: 1 })}
            sortField={filters.sort}
            setSortField={(field) => handleFilterChange({ sort: field })}
            sortOrder={filters.order}
            setSortOrder={(order) => handleFilterChange({ order })}
        />

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                    onClick={() => {
                      if (filters.page > 1) {
                        handleFilterChange({ page: filters.page - 1 });
                      }
                    }}
                    className={filters.page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                        onClick={() => handleFilterChange({ page: index + 1 })}
                        isActive={filters.page === index + 1}
                        className="px-3 py-1 rounded-md transition-colors duration-200 hover:bg-gray-200"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                    onClick={() => {
                      if (filters.page < totalPages) {
                        handleFilterChange({ page: filters.page + 1 });
                      }
                    }}
                    className={filters.page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </>
  );
}
