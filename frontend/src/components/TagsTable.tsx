import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@tanstack/react-router';
import { Edit, Trash2, Tag as TagIcon } from 'lucide-react';
import PrimaryButton from "@/components/Buttons/PrimaryButton.tsx";

export interface Tag {
    id: string;
    tagName: string;
    slug: string;
    summary: string;
}

interface TagsTableProps {
    tags: Tag[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TagsTable: React.FC<TagsTableProps> = ({ tags, onEdit, onDelete }) => {
    return (
        <div className="bg-white pt-4 px-10 rounded-xl shadow-md border-gray-200 pb-16 mt-10">
            <div className="flex justify-between mb-6 mt-6">
                <h2 className="text-lg font-bold flex items-center space-x-2">
                    <TagIcon className="w-5 h-5 text-purple-600" />
                    <span>Tags</span>
                </h2>
                <PrimaryButton className={"hover:bg-purple-100 hover:text-purple-600 "}>
                    + New Tag
                </PrimaryButton>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <table className="table-auto w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-600">
                    <tr>
                        <th className="px-4 py-2 flex items-center">
                            Tag Name
                        </th>
                        <th className="px-4 py-2">Slug</th>
                        <th className="px-4 py-2">Summary</th>
                        <th className="px-4 py-2 text-center">Go to Blogs</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tags.map((tag) => (
                        <tr
                            key={tag.id}
                            className="hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0"
                        >
                            <td className="px-4 py-2">{tag.tagName}</td>
                            <td className="px-4 py-2">{tag.slug}</td>
                            <td className="px-4 py-2">{tag.summary}</td>
                            <td className="px-4 py-2 text-center">
                                <Link
                                    to={`/tags/${tag.id}/blogs`}
                                    target="_blank"
                                    className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                                >
                                    Go to Blogs
                                </Link>
                            </td>
                            <td className="px-4 py-2 text-right">
                                <div className="flex justify-end items-center space-x-2">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <button
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded-md transition-all duration-200"
                                                aria-label="Edit tag"
                                                onClick={() => onEdit(tag.id)}
                                            >
                                                <Edit size={20}/>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Edit
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <button
                                                className="text-red-600 hover:text-red-800 p-1 rounded-md transition-all duration-200"
                                                aria-label="Delete tag"
                                                onClick={() => onDelete(tag.id)}
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

export default TagsTable;
