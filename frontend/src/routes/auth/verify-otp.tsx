// import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {createFileRoute} from "@tanstack/react-router";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast.ts";


export const Route = createFileRoute('/auth/verify-otp')({
  component: RouteComponent,
})

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

function RouteComponent() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">Verify OTP</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="text-center block text-sm font-medium text-gray-700">One-Time Password</FormLabel>
                          <FormControl >
                            <InputOTP maxLength={6} {...field} className={"flex justify-center items-center"}>
                              <InputOTPGroup className="flex justify-center  gap-2">
                                <InputOTPSlot index={0}  />
                                <InputOTPSlot index={1}  />
                                <InputOTPSlot index={2}  />
                                <InputOTPSlot index={3}  />
                                <InputOTPSlot index={4}  />
                                <InputOTPSlot index={5}  />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription className="text-center text-sm text-gray-500">
                            Please enter the one-time password sent to your phone.
                          </FormDescription>
                          <FormMessage className="text-center text-red-500" />
                        </FormItem>
                    )}
                />

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
  )
}
