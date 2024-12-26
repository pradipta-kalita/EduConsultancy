import { Mail, User, Calendar } from "lucide-react";
import {ContactUsSummary} from "@/types/contactUsTypes.ts";
import dayjs from "dayjs";
import {Link} from "@tanstack/react-router";

interface ContactUsListProps {
    data: ContactUsSummary[];
}

export function ContactUsList({ data }: ContactUsListProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl flex gap-2 font-bold text-gray-700 mb-4 items-center">
                <Mail size={24} className="text-blue-500"/>
                Contact Us Messages
            </h2>

            <div>
                {data.map((message, index) => (
                    <Link to='/admin/contact-us/$id' params={{id:message.id}} key={message.id}>
                        <div className="py-4  rounded-lg px-2 transition">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <User className="text-blue-500 w-5 h-5"/>
                                    <div>
                                        <h3 className="font-medium text-gray-800">{message.name}</h3>
                                        <p className="text-sm text-gray-500">{message.subject}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">
                                    <Calendar className="inline-block w-4 h-4 mr-1"/>
                                    {dayjs(message.createdAt).format("MMM DD, YYYY")}
                                </p>
                            </div>
                            {index < data.length - 1 && <hr className="my-4 border-gray-200"/>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
