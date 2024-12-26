export interface ContactUsPage {
    list: ContactUsSummary[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNext:boolean;
    hasPrevious:boolean;
}

export interface ContactUsSummary {
    id: string;
    name: string;
    subject: string;
    createdAt: string;
}

export interface ContactUsResponse {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactUsRequest {
    name: string;
    phoneNumber: string;
    email: string;
    subject: string;
    message: string;
}