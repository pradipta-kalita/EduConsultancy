import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').max(50, 'Name must be under 50 characters'),
    summary: z.string().min(10, 'Summary must be at least 10 characters long').max(200, 'Summary must be under 200 characters'),
});

export type CategoryRequestDTO = z.infer<typeof createCategorySchema>;