import { z } from 'zod';

export const BlogRequestSchema = z.object({
    title: z.string().min(1, "Please provide title."),
    content: z.string().min(1, "Please write something"),
    tagIds: z
        .array(z.string().uuid({ message: "Each tag ID must be a valid UUID" }))
        .nonempty({ message: "You need to provide at least one tag." })
        .max(10, { message: "You can add up to 10 tags only." }),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'], {
        errorMap: () => ({ message: "Please select a valid status for the blog." }),
    }),
    imageUrl: z.string().url({ message: "Please provide a valid image URL." }),
});

export type BlogRequestDTO = z.infer<typeof BlogRequestSchema>;
