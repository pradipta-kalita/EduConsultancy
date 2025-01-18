import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, loginSchema } from '../../schemas/loginSchema.tsx';
import {createFileRoute, Link, useNavigate} from '@tanstack/react-router';
import {useAuth} from "@/auth/authContext.tsx";
import axios from '@/utils/axiosInstance.ts';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate =useNavigate();
  const {login} =useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response =await  axios.post('/auth/login', data);
      const { username, role, accessToken } = response.data;
      const user = { username, role, accessToken };
      login(user);
      if(user.role=='ADMIN'){
        navigate({to:'/admin'})
      }else if(user.role=='STUDENT'){
        navigate({to:'/profile'})
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-100">
        <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <p className="font-bold text-center mb-8 text-gray-600">
            Log in to access your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      errors.email
                          ? 'focus:ring-red-500'
                          : 'focus:ring-primary-light'
                  }`}
                  placeholder="Enter your email"
              />
              {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
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
                      errors.password
                          ? 'focus:ring-red-500'
                          : 'focus:ring-primary-light'
                  }`}
                  placeholder="Enter your password"
              />
              {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
              )}
            </div>

            <p className="text-center flex justify-items-start mb-2 text-gray-600">
              <span className='pr-1'>Forgot password? </span>
              <Link
                  to="/auth/forgot-password"
                  className="text-primary-light hover:underline"
              >
                Reset Now
              </Link>
            </p>

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
                    'Login'
                )}
              </button>
            </div>
          </form>

          {/* Signup Redirect */}
          <p className="text-center text-gray-600">
            Don't have an account? {' '}
            <Link
                to="/auth/signup"
                className="text-primary-light hover:underline"
            >
            Sign up
            </Link>
          </p>
        </div>
      </div>
  );
}

export default RouteComponent;
