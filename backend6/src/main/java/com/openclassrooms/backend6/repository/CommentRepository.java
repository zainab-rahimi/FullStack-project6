package com.openclassrooms.backend6.repository;

import com.openclassrooms.backend6.entity.Article;
import com.openclassrooms.backend6.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// repository/CommentRepository.java
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArticleOrderByCreatedAtAsc(Article article);
}