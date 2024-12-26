import React from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PrimaryButton from "@/components/Buttons/PrimaryButton.tsx";
import { Link } from "@tanstack/react-router";

// type FilterType = "All" | "Published" | "Draft" | "Archived";

interface BlogSummary {
    id: string;
    title: string;
    publishedAt: string;
    summary: string;
    author: string;
    status: string;
}

interface BlogListProps {
    blogs: BlogSummary[];
    pageSize: number;
    setPageSize: (size: number) => void;
    sortOrder: string;
    setSortOrder: (order: string) => void;
    sortField: string;
    setSortField: (field: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({
                                               blogs,
                                               pageSize,
                                               setPageSize,
                                               sortOrder,
                                               setSortOrder,
                                               sortField,
                                               setSortField,
                                           }) => {

    return (
        <div className="bg-white pt-4 px-10 rounded-xl shadow-md border-gray-200 pb-10">
            {/* Header Section */}
            <div className="mb-6 flex justify-between items-center">
                {/* Filters */}
                <div className="flex gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Page Size</label>
                        <select
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                            value={pageSize}
                            onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
                        >
                            {[10, 25, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size} per page
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sort Field</label>
                        <select
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                        >
                            <option value="title">Title</option>
                            <option value="publishedAt">Published Date</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sort Order</label>
                        <select
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
                {/* "+ New Blog" Button */}
                <Link to="/admin/blogs/create">
                    <PrimaryButton className="hover:bg-purple-100 hover:text-purple-600 ">+ New Blog</PrimaryButton>
                </Link>
            </div>

            {/* Table Section */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white text-gray-600">
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Published Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs.map((blog) => (
                            <TableRow key={blog.id} className="hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0">
                                <TableCell>{blog.title}</TableCell>
                                <TableCell>{blog.author}</TableCell>
                                <TableCell>{new Date(blog.publishedAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                  <span
                      className={cn(
                          "inline-block px-2 py-1 rounded-md text-sm",
                          blog.status === "PUBLISHED"
                              ? "bg-green-100 text-green-600"
                              : blog.status === "DRAFT"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-gray-100 text-gray-600"
                      )}
                  >
                    {blog.status}
                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end items-center space-x-2">
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Link to='/blogs/$id' params={{ id: blog.id }}>
                                                    <button
                                                        className="text-blue-600 hover:text-pink-800  p-1 rounded-md transition-all duration-200"
                                                        aria-label="View blog"
                                                    >
                                                        <Eye size={20} />
                                                    </button>
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>View</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Link to="/admin/blogs/edit/$id" params={{ id: blog.id }}>
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md transition-all duration-200"
                                                        aria-label="Edit blog"
                                                    >
                                                        <Edit size={20}/>
                                                    </button>
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>Edit</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button
                                                    className="text-red-600 hover:text-red-800 p-1 rounded-md transition-all duration-200"
                                                    aria-label="Delete blog"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>Delete</TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BlogList;
