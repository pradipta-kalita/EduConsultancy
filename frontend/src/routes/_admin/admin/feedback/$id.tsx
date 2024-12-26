import {createFileRoute, ErrorComponent, useNavigate} from '@tanstack/react-router';
import {Button} from "@/components/ui/button.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {feedbackResponseQuery} from "@/service/feedbacks.ts";


export const Route = createFileRoute('/_admin/admin/feedback/$id')({
    loader: async({ params: { id }, context }) => {
        try {
            return await context.queryClient.ensureQueryData(feedbackResponseQuery(id));
        } catch (error) {
            console.error('Error fetching feedback data:', error);
            throw new Error('Failed to load feedback data');
        }
    },
    component: RouteComponent,
    errorComponent:ErrorComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();
    const navigate = useNavigate();
    const { data: feedback, isLoading, isError } = useSuspenseQuery(feedbackResponseQuery(id));

    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Error loading feedback data</div>;
    }

    if (!feedback) {
        return <div className="text-center text-gray-500">No feedback found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-6 space-x-4">
                <h2 className="text-3xl font-semibold text-gray-800 flex items-center space-x-2">
                    <span>📋</span>
                    <span>Feedback Details</span>
                </h2>
                <Button variant="outline" className="ml-auto" onClick={() => navigate({
                    to: '/admin/feedback',
                    search: {
                        page: 1, order: "asc", sort: "name", size: 10
                    }
                })}>
                    Back
                </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-md shadow-sm">
                <div className="mb-4">
                    <p className="text-xl font-medium text-gray-700">Feedback by {feedback.name}</p>
                    <p className="text-sm text-gray-500">{new Date(feedback.createdAt).toLocaleString()}</p>
                </div>

                <div className="mb-4">
                    <p className="font-medium text-gray-700">Rating:
                        <span className="text-yellow-500 ml-2">{'★'.repeat(Math.round(feedback.rating))}</span>
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600"><strong>Email:</strong> {feedback.email}</p>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600"><strong>Feedback:</strong></p>
                    <p className="text-gray-800">{feedback.feedback}</p>
                </div>
            </div>
        </div>
    );
}
