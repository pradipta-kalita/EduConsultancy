import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { feedbackFormSchema, FeedbackFormData } from '../schemas/feedbackFormSchema'; // Adjust path
import { FaStar } from 'react-icons/fa'; // Install react-icons if not already installed

export default function FeedbackForm() {
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState<number>(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackFormSchema),
    });

    const onSubmit = async (data: FeedbackFormData) => {
        setIsLoading(true); // Show loading state
        setServerMessage(null); // Clear any previous messages
        try {
            const response = await axios.post('http://localhost:8080/feedbacks', { ...data, rating }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Success:', response.data);
            setServerMessage('Thank you for your feedback!');
            reset();
        } catch (error) {
            console.log('Error:', error);
            setServerMessage('Failed to submit feedback. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStarClick = (value: number) => {
        setRating(value);
        setValue('rating', value.toString());
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

            {/* Feedback */}
            <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                    Feedback
                </label>
                <textarea
                    id="feedback"
                    {...register('feedback')}
                    rows={4}
                    className={`mt-1 block w-full px-3 py-2 bg-white border ${
                        errors.feedback ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                ></textarea>
                {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>}
            </div>

            {/* Rating */}
            <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                    Rating
                </label>
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <FaStar
                            key={value}
                            className={`cursor-pointer text-2xl ${
                                value <= rating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            onClick={() => handleStarClick(value)}
                        />
                    ))}
                </div>
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
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
                    'Submit Feedback'
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
