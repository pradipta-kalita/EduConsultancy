import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PaymentList from "@/components/PaymentList.tsx";
import { Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-adapter";
import { paymentSearchSchema } from "@/schemas/paymentSearchSchema.tsx";
import { fetchPayments } from "@/service/payments.ts";

export const Route = createFileRoute("/_admin/admin/payments/")({
    validateSearch: zodValidator(paymentSearchSchema),
    component: RouteComponent,
});

function RouteComponent() {
    // Get search parameters from the URL
    const { page = 1, size = 10, sort = "createdAt", order = "asc" } = Route.useSearch();

    // Use navigate to change the URL
    const navigate = useNavigate();

    // Fetch payments based on current search parameters
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["payments", page, size, sort, order],
        queryFn: async () => {
            const response = await fetchPayments(page, size, order, sort);
            return response.data;
        },
    });

    const handlePageChange = (newPage: number) => {
        navigate({
            to:'/admin/payments',
            // Update the search parameters in the URL
            search: {
                page: newPage,
                size,
                sort,
                order,
            },
            replace: false, // Keep navigation history
        });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Header with Title */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-purple-600" />
                    <span>Payments</span>
                </h2>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-lg shadow p-4">
                {isLoading && (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="text-gray-600 text-center">Loading payments...</div>
                    </div>
                )}

                {isError && (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="text-red-600 text-center">
                            Failed to load payments. Please try again later.
                        </div>
                        <button
                            onClick={() => refetch()}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {!isLoading && !isError && data?.list?.length === 0 && (
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="text-gray-600 text-center">No payments found.</div>
                    </div>
                )}

                {!isLoading && !isError && data && data.list.length > 0 && (
                    <>
                        <PaymentList payments={data.list} />
                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => handlePageChange(data.currentPage)}
                                disabled={!data.hasPrevious}
                                className={`px-4 py-2 border rounded-lg ${
                                    !data.hasPrevious ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                Previous
                            </button>
                            {Array.from(
                                { length: data.totalPages },
                                (_, i) => i + 1
                            ).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`mx-1 px-4 py-2 border rounded-lg ${
                                        data.currentPage === pageNum -1
                                            ? "bg-purple-600 text-white"
                                            : "hover:bg-gray-200"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange((data.currentPage +1 )+ 1)}
                                disabled={!data.hasNext}
                                className={`px-4 py-2 border rounded-lg ${
                                    !data.hasNext ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
