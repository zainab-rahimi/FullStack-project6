package com.openclassrooms.backend6.repository;

import com.openclassrooms.backend6.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

// repository/ArticleRepository.java
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // Feed: articles from topics the user subscribes to, sorted by date desc
    @Query("SELECT a FROM Article a WHERE a.topic.id IN :topicIds ORDER BY a.createdAt DESC")
    List<Article> findByTopicIdsOrderByCreatedAtDesc(@Param("topicIds") List<Long> topicIds);

    @Query("SELECT a FROM Article a WHERE a.topic.id IN :topicIds ORDER BY a.createdAt ASC")
    List<Article> findByTopicIdsOrderByCreatedAtAsc(@Param("topicIds") List<Long> topicIds);
}