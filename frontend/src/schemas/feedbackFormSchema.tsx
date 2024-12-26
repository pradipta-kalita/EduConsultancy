import * as z from 'zod';

export const feedbackFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    feedback: z.string().min(1, 'Feedback is required'),
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
