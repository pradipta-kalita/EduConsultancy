import * as z from 'zod';

export const feedbackFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    feedback: z.string().min(1, 'Feedback is required'),
    rating: z
        .string()
        .min(1, 'Please provide a rating between 1 and 5')
        .max(5, 'Rating must be between 1 and 5'),
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
