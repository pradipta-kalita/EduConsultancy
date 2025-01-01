import { z } from "zod";
import { CourseStatus } from "@/types/courseTypes.ts";

export const createCourseSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    summary: z.string().min(1, "Summary is required").max(255, "Summary is too long"),
    price: z.number().min(0, "Price must be at least 0"),
    status: z.nativeEnum(CourseStatus).refine(
        (status) => status === CourseStatus.ACTIVE || status === CourseStatus.INACTIVE,
        { message: "Status must be ACTIVE or INACTIVE" }
    ),
    categoryId: z.string().uuid("Invalid category ID"),
    imageUrl: z.string().url({ message: "Please provide a valid image URL." }),
});

// Infer the CourseRequestDTO type from the schema
export type CourseRequestDTO = z.infer<typeof createCourseSchema>;
