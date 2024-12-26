import { createFileRoute } from '@tanstack/react-router'
import FeedbackForm from "@/components/FeedbackForm.tsx";

export const Route = createFileRoute('/_layout/feedback')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              We Value Your Feedback
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your opinion helps us improve our services. Please share your thoughts with us.
            </p>
          </div>
          <FeedbackForm />
        </div>
      </div>
  )
}
