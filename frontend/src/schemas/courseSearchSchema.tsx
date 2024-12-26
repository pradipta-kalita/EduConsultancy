import {z} from "zod";
import { fallback } from '@tanstack/zod-adapter';

export const courseSearchSchema = z.object({
    page: fallback(z.number(),1).default(1),
    size:fallback(z.number(),9).default(9),
    order:fallback(z.enum(['asc','desc']),'asc').default('asc'),
    sort: fallback(z.enum(['title', 'price', 'instructor']),'title').default('title'),
})
