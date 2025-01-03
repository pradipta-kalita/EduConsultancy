import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { contactFormSchema, ContactFormData } from '../schemas/contactFormSchema';

export default function ContactForm() {
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsLoading(true); // Show loading state
        setServerMessage(null); // Clear any previous messages
        console.log(data)
        try {
            const response = await axios.post('http://localhost:8080/contactus', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Success:', response.data);
            setServerMessage('Thank you for your message. We’ll get back to you soon!');
            reset();
        } catch (error) {
            console.log('Error:', error);
            setServerMessage('Failed to send the message. Please try again later.');
        } finally {
            setIsLoading(false); // Hide loading state
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
            {/* Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    id="name"
                    {...register('name')}
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 bg-white border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    id="phone"
                    {...register('phoneNumber')}
                    type="tel"
                    className={`mt-1 block w-full px-3 py-2 bg-white border ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    {...register('email')}
                    type="email"
                    className={`mt-1 block w-full px-3 py-2 bg-white border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                </label>
                <input
                    id="subject"
                    {...register('subject')}
                    type="text"
                    className={`mt-1 block w-full px-3 py-2 bg-white border ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                </label>
                <textarea
                    id="message"
                    {...register('message')}
                    rows={4}
                    className={`mt-1 block w-full px-3 py-2 bg-white border ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
                {isLoading ? (
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                ) : (
                    'Send Message'
                )}
            </button>

            {/* Server Message */}
            {serverMessage && (
                <div
                    className={`mt-4 ${
                        serverMessage.includes('Thank you')
                            ? 'bg-green-100 border-green-400 text-green-700'
                            : 'bg-red-100 border-red-400 text-red-700'
                    } px-4 py-3 rounded relative`}
                    role="alert"
                >
                    <span className="block sm:inline">{serverMessage}</span>
                </div>
            )}
        </form>
    );
}
