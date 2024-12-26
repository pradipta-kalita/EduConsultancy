import { z } from 'zod';

export const TagRequestSchema = z.object({
    tagname: z.string().min(1, "Please provide tag name"),
});

export type TagRequestDTO = z.infer<typeof TagRequestSchema>;
