import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Link} from "@tanstack/react-router";
import { CourseSummary } from "@/types/courseTypes";


interface CourseCardProps {
    course: CourseSummary
}

export function CourseCard({ course }: CourseCardProps) {
    return (
        <Card className="flex flex-col h-full text-sm">
            <CardHeader>
                <img
                    src={course.imageUrl || "https://miro.medium.com/v2/resize:fit:720/format:webp/1*QnEHTb57iUU8KPQ-gBzw6w.png"}
                    alt={course.title}
                    width={200}
                    height={100}
                    className="w-full h-auto object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent className="flex-grow">
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <p className="text-sm text-gray-600 mb-1">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-600 mb-2">Duration: 3 weeks</p>
                <p className="text-sm text-gray-700 mb-4 line-clamp-4">{course.summary}</p>
                <p className="text-lg font-bold text-primary"><span>&#8377;</span>{course.price.toFixed(2)}/-
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                   <Link to="/courses/$id" params={{id:course.id}} >
                       View Course Details</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}