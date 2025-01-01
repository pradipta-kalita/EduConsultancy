package com.pol.blog_service.mapper;

import com.pol.blog_service.dto.blog.BlogRequestDTO;
import com.pol.blog_service.dto.blog.BlogResponseDTO;
import com.pol.blog_service.entity.Blog;

import java.util.stream.Collectors;

public class BlogMapper {
    public static Blog toEntity(BlogRequestDTO blogRequestDTO){
        return Blog.builder()
                .title(blogRequestDTO.getTitle())
                .content(blogRequestDTO.getContent())
                .status(blogRequestDTO.getStatus())
                .imageUrl(blogRequestDTO.getImageUrl())
                .build();
    }

    public static BlogResponseDTO toResponseDTO(Blog blog){
        return BlogResponseDTO.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .content(blog.getContent())
                .author(blog.getAuthor())
                .authorId(blog.getAuthorId())
                .publishedAt(blog.getPublishedAt().toString())
                .status(blog.getStatus())
                .tags(blog.getTags().stream().map(TagsMapper::toSummaryDTO).collect(Collectors.toSet()))
                .imageUrl(blog.getImageUrl())
                .build();
    }
}
