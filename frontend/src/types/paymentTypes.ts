export interface PaymentResponse {
	id: string;
	amount: number;
	currency: string;
	productId: string;
	userId: string;
	createdAt: string;
}

export interface PaymentPageResponse {
	list: PaymentResponse[];
	totalElements: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

