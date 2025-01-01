export interface BlogPageResponse {
    blogs: BlogSummary[],
    totalElements: number,
    totalPages: number,
    currentPage: number,
    pageSize: number
    hasNext: boolean,
    hasPrevious: boolean,
}

export interface BlogSummary {
    id: string;
    title: string;
    publishedAt: string;
    summary: string;
    author: string;
    authorId: string;
    status: string;
    imageUrl:string;
}

export interface BlogResponse {
    id:string;
    title: string;
    author: string;
    authorId: string;
    publishedAt: string;
    content: string;
    imageUrl: string;
}

export interface BlogAdminResponse {
    id:string;
    title: string;
    author: string;
    authorId: string;
    publishedAt: string;
    content: string;
    imageUrl: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    tags: TagSummary[];
}



////////////////////////////////////////////////////
/////////////////////  Tag  ////////////////////////
////////////////////////////////////////////////////
export interface Tag {
    id: string;
    tagName: string;
    slug: string;
    summary: string;
}

export interface TagResponse {
    id: string;
    tagName: string;
}

export interface TagSummary {
    id: string;
    tagName: string;
}

export interface TagsPageResponse {
    tags: Tag[];
}