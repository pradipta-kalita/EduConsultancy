package com.pol.blog_service.service.blog;

import com.pol.blog_service.dto.blog.BlogPageResponseDTO;
import com.pol.blog_service.dto.blog.BlogRequestDTO;
import com.pol.blog_service.dto.blog.BlogResponseDTO;
import com.pol.blog_service.entity.BlogStatus;

import java.util.UUID;

public interface BlogService {
    BlogResponseDTO createBlog(BlogRequestDTO blogRequestDTO,String userId, String username);
    BlogResponseDTO updateBlog(BlogRequestDTO blogRequestDTO, UUID id,String userId);
    BlogResponseDTO getBlogById(UUID id);
    void deleteBlogById(UUID id,String userId);
    BlogPageResponseDTO getAllBlogs(int page, int size, String sortBy, String order, BlogStatus status);
    BlogPageResponseDTO searchBlogsByKeyword(String keyword,int page, int size, String sortBy, String order);
}
