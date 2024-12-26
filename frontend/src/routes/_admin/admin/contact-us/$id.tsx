import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Mail, MessageSquare, Phone, User} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {contactUsResponseQuery} from "@/service/contactUs.ts";

export const Route = createFileRoute('/_admin/admin/contact-us/$id')({
  component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams();
    const navigate = useNavigate();
    const { data: contact } = useSuspenseQuery(contactUsResponseQuery(id));

    if (!contact) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-6 space-x-4">
                <h2 className="text-3xl font-semibold text-gray-800 flex items-center space-x-2">
                    <MessageSquare size={28} className="text-blue-600" />
                    <span>Contact Request</span>
                </h2>
                <Button variant="outline" className="ml-auto" onClick={() => navigate({ to: "/admin/contact-us" ,search:{
                    page:1,
                    sort:"name",
                    size:10,
                    order:"asc"
                    }
                })}>
                    Back to List
                </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-md shadow-sm">
                <div className="flex items-center mb-4 space-x-3">
                    <User className="text-gray-700" size={24} />
                    <p className="text-xl font-medium text-gray-700">{contact.name}</p>
                </div>

                <div className="mb-4 flex items-center space-x-3">
                    <Mail className="text-gray-700" size={20} />
                    <p className="text-gray-600 font-medium">{contact.email}</p>
                </div>

                <div className="mb-4 flex items-center space-x-3">
                    <Phone className="text-gray-700" size={20} />
                    <p className="text-gray-600 font-medium">{contact.phoneNumber}</p>
                </div>

                <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-700">Subject:</p>
                    <p className="text-gray-600">{contact.subject}</p>
                </div>

                <div>
                    <p className="text-lg font-semibold text-gray-700">Message:</p>
                    <p className="text-gray-600">{contact.message}</p>
                </div>
            </div>
        </div>
    );
}
