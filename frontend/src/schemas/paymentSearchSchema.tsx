import {z} from "zod";
import { fallback } from '@tanstack/zod-adapter';

export const paymentSearchSchema = z.object({
    page: fallback(z.number(),1).default(1),
    size:fallback(z.number(),10).default(10),
    order:fallback(z.enum(['asc','desc']),'asc').default('asc'),
    sort: fallback(z.enum(['createdAt']),'createdAt').default('createdAt'),
})