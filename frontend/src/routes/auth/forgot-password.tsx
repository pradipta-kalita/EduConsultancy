import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from '@tanstack/react-router';
import api from '@/utils/axiosInstance.ts';
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    setServerMessage(null); // Clear previous messages

    try {
      // API Call
      const response = await api.post('http://localhost:8080/auth/forgot-password/verify', data);


      console.log('Success:', response.data);
      setServerMessage('A reset password link has been sent to your email!');

      // Navigate to /auth/verify-otp after 2 seconds
      setTimeout(() => navigate({ to: `/auth/verify-otp?email=${data.email}` }), 2000);
    } catch  {
      setServerMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Reset Password'}
              </Button>
            </form>

            {/* Server Message */}
            {serverMessage && (
                <div
                    className={`mt-4 px-4 py-3 rounded ${
                        serverMessage.includes('reset password link')
                            ? 'bg-green-100 text-green-700 border border-green-400'
                            : 'bg-red-100 text-red-700 border border-red-400'
                    }`}
                >
                  {serverMessage}
                </div>
            )}
          </CardContent>
        </Card>
      </div>
  );
}
