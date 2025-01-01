import * as z from 'zod';

export const contactFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z
        .string()
        .regex(/^\d+$/, 'Phone number must contain only numbers')
        .min(10, 'Phone number must be at least 10 digits'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
