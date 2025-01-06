import React from "react";
import { Edit, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CourseSummary } from "@/types/courseTypes.ts";
import {Link} from "@tanstack/react-router";
import { useDeleteCourse} from "@/service/courses.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {successToastColor} from "@/utils/toastColors.ts";

interface CourseListProps {
    courses: CourseSummary[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {

    const {toast} = useToast();
    const deleteMutation = useDeleteCourse();
    function handleDelete(id: string) {
        deleteMutation.mutate(id);
        if(deleteMutation.isSuccess) {
            toast({
                title: "Course has been deleted successfully",
                style:successToastColor
            })
        }else if(deleteMutation.isError){
            toast({
                title: "There was an error deleting the course",
                variant: "destructive"
            })
        }
    }
    return (
        <div className="bg-white pt-24 px-10 rounded-xl border-gray-200 pb-10">
            {/* Table Section */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white text-gray-600">
                            <TableHead>Title</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow
                                key={course.id}
                                className="hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0"
                            >
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.instructor}</TableCell>
                                <TableCell><span>&#8377;</span>{course.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end items-center space-x-2">
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Link to='/admin/courses/edit/$id' params={{id: course.id}}>
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md transition-all duration-200"
                                                        aria-label="Edit course"
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
                                                    onClick={()=>handleDelete(course.id)}
                                                    className="text-red-600 hover:text-red-800 p-1 rounded-md transition-all duration-200"
                                                    aria-label="Delete course"
                                                >
                                                    <Trash2 size={20}/>
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

export default CourseList;
