import {createFileRoute, Link, useNavigate,} from '@tanstack/react-router'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {zodResolver} from "@hookform/resolvers/zod";

import {SignupFormData, signupSchema} from "../../schemas/signupSchema.tsx";
import {useState} from "react";
import {useAuth} from "@/auth/authContext.tsx";

export const Route = createFileRoute('/auth/signup')({
    component: RouteComponent,
})

function RouteComponent() {
    const {login} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate({from: '/auth/signup'});

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });


    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true); // Start the spinner
        try {
            const response = await axios.post('http://localhost:8080/auth/register', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const {username, role, accessToken} = response.data;
            console.log(response.data);
            const user = {username, role, accessToken};
            login(user);
            setIsLoading(false);
            await navigate({to: '/auth/login'})
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
            await navigate({to: '/notfound'})
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-100">
            <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome to EduConsultancy!
                </h2>
                <p className="font-bold text-center mb-8 text-gray-600">
                    You are joining India’s largest study abroad network
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* First Name */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-600 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            {...register('firstName')}
                            className={`w-full px-4 py-2 border ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 ${
                                errors.firstName ? 'focus:ring-red-500' : 'focus:ring-primary-light'
                            }`}
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-600 mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            {...register('lastName')}
                            className={`w-full px-4 py-2 border ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 ${
                                errors.lastName ? 'focus:ring-red-500' : 'focus:ring-primary-light'
                            }`}
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                    </div>

                    {/* Username */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register('username')}
                            className={`w-full px-4 py-2 border ${
                                errors.username ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 ${
                                errors.username ? 'focus:ring-red-500' : 'focus:ring-primary-light'
                            }`}
                            placeholder="Choose a username"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className={`w-full px-4 py-2 border ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 ${
                                errors.email ? 'focus:ring-red-500' : 'focus:ring-primary-light'
                            }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            className={`w-full px-4 py-2 border ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 ${
                                errors.password ? 'focus:ring-red-500' : 'focus:ring-primary-light'
                            }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mb-6">
                        <button
                            type="submit"
                            disabled={isLoading} // Disable button during loading
                            className={`w-full bg-primary-light text-white font-bold py-2 px-4 rounded-md transition duration-200 ${
                                isLoading
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-primary-dark'
                            }`}
                        >
                            {isLoading ? (
                                <svg
                                    className="animate-spin h-5 w-5 mx-auto"
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
                                'Sign up'
                            )}
                        </button>
                    </div>

                </form>

                {/* Already Have an Account */}
                <p className="text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-primary-light hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
