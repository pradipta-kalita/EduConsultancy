import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import {createFileRoute, useNavigate} from "@tanstack/react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast.ts";
import api from "@/utils/axiosInstance.ts";
import {zodValidator} from "@tanstack/zod-adapter";
import {emailSchema} from "@/schemas/emailSchema.tsx";
import {useAuth} from "@/auth/authContext.tsx";

export const Route = createFileRoute("/auth/verify-otp")({
  validateSearch: zodValidator(emailSchema),
  component: RouteComponent,
});

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function RouteComponent() {
  const navigate =useNavigate();
  const {login} =useAuth();
  const { toast } = useToast();
  const {email} = Route.useSearch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    try {
      const response = await api.post(
          "http://localhost:8080/auth/forgot-password/verify-otp",
          data
      );
      toast({
        title: "Success!",
        description: "OTP verified successfully.",
      });
      const { username, role, accessToken } = response.data;
      const user = { username, role, accessToken };
      login(user);
      if(user.role=='ADMIN'){
        navigate({to:'/admin'})
      }else if(user.role=='STUDENT'){
        navigate({to:'/profile'})
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
      });
    }
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Verify OTP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                                {...field}
                                type="email"
                                readOnly
                                className="bg-gray-200 cursor-not-allowed"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-500">
                            This is the email associated with your account.
                          </FormDescription>
                        </FormItem>
                    )}
                />

                {/* OTP Field */}
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="text-center block text-sm font-medium text-gray-700">
                            One-Time Password
                          </FormLabel>
                          <FormControl>
                            <InputOTP
                                maxLength={6}
                                {...field}
                                className={"flex justify-center items-center"}
                            >
                              <InputOTPGroup className="flex justify-center gap-2">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription className="text-center text-sm text-gray-500">
                            Please enter the one-time password sent to your email.
                          </FormDescription>
                          <FormMessage className="text-center text-red-500" />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
  );
}
