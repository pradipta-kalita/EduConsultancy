import { createFileRoute } from '@tanstack/react-router'
import ContactForm from "@/components/ContactForm.tsx";

export const Route = createFileRoute('/_layout/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className="min-h-screen flex items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Contact Us
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
  )
}
