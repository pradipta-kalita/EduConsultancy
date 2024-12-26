export interface FeedbackPage {
    list: FeedbackSummary[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNext:boolean;
    hasPrevious:boolean;
}

export interface FeedbackSummary {
    id: string;
    name:string;
    rating:number;
    email:string;
    summary:string;
    createdAt: string;
}

export interface FeedbackResponse {
    id: string;
    name: string;
    rating:number;
    email: string;
    feedback: string;
    createdAt: string;
}

export interface FeedbackRequest {
    name: string;
    email: string;
    feedback: string;
    rating:number;
}
