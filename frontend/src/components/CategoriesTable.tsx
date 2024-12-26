import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@tanstack/react-router';
import { Edit, Trash2 } from 'lucide-react';
import {CategoryResponse} from "@/types/courseTypes.ts";
import {useDeleteCategory} from "@/service/courses.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {successToastColor} from "@/utils/toastColors.ts";

interface CategoriesTableProps {
    categories: CategoryResponse[];
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
    const {toast} =useToast();
    const {mutate} = useDeleteCategory();
    return (
        <div className="bg-white pt-4 px-10 rounded-xl border-gray-200 pb-16 mt-10">

            <div className="border rounded-lg overflow-hidden">
                <table className="table-auto w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-600">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Summary</th>
                        <th className="px-4 py-2 text-center">Courses</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category) => (
                        <tr
                            key={category.id}
                            className="hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0"
                        >
                            <td className="px-4 py-2">{category.name}</td>
                            <td className="px-4 py-2">{category.summary}</td>
                            <td className="px-4 py-2 text-center">
                                <Link
                                    to={`/categories/${category.id}/courses`}
                                    target="_blank"
                                    className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                                >
                                    Go to Courses
                                </Link>
                            </td>
                            <td className="px-4 py-2 text-right">
                                <div className="flex justify-end items-center space-x-2">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link to='/admin/categories/edit/$id' params={{ id: category.id }}>
                                                <button
                                                    className="text-blue-600 hover:text-blue-800 p-1 rounded-md transition-all duration-200"
                                                    aria-label="Edit category"
                                                >
                                                    <Edit size={20}/>
                                                </button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Edit
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                        <button
                                                className="text-red-600 hover:text-red-800 p-1 rounded-md transition-all duration-200"
                                                aria-label="Delete category"
                                                onClick={() => {
                                                    mutate(category.id,{
                                                        onSuccess: () => {
                                                            toast({
                                                                title: 'Successfully deleted category',
                                                                style:successToastColor
                                                            })
                                                        },
                                                        onError: () => {
                                                            toast({
                                                                title: 'Error while deleting category',
                                                                variant: "destructive"
                                                            })
                                                        }
                                                    });

                                                }}
                                            >
                                                <Trash2 size={20}/>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Delete
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoriesTable;
