import {z} from "zod";
import { fallback } from '@tanstack/zod-adapter';

export const blogSearchSchema = z.object({
    page: fallback(z.number(),1).default(1),
    size:fallback(z.number(),10).default(10),
    order:fallback(z.enum(['asc','desc']),'asc').default('asc'),
    sort: fallback(z.enum(['title', 'publishedAt']),'title').default('publishedAt'),
})

const validSortFields = ["title", "publishedAt"] as const;
const validOrderFields = ["asc", "desc"] as const;

export function isSortField(value: string): value is typeof validSortFields[number] {
    return validSortFields.includes(value as typeof validSortFields[number]);
}

export function isOrderField(value: string): value is typeof validOrderFields[number] {
    return validOrderFields.includes(value as typeof validOrderFields[number]);
}
