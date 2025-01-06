import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaymentResponse } from "@/types/paymentTypes";

interface PaymentListProps {
    payments: PaymentResponse[];
}

const PaymentList: React.FC<PaymentListProps> = ({ payments }) => {
    return (
        <div className="bg-white pt-16 px-10 pb-10">
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white text-gray-600">
                            <TableHead>Order ID</TableHead>
                            <TableHead>User ID</TableHead>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Currency</TableHead>
                            <TableHead>Created Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <TableRow
                                    key={payment.id}
                                    className="hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0"
                                >
                                    <TableCell>{payment.id}</TableCell>
                                    <TableCell>{payment.userId}</TableCell>
                                    <TableCell>{payment.productId}</TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat("en-IN", {
                                            style: "currency",
                                            currency: payment.currency,
                                        }).format(payment.amount/100)}
                                    </TableCell>

                                    <TableCell>{payment.currency}</TableCell>
                                    <TableCell>
                                        {new Date(payment.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                                    No payments found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PaymentList;
