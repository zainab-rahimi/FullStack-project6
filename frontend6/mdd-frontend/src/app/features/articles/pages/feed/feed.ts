import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticleService, ArticleResponse } from '../../../../core/services/article';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { ArticleCard } from '../../../../shared/components/article-card/article-card';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, RouterLink, Navbar, ArticleCard],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit {
  articles: ArticleResponse[] = [];
  sortOrder: 'desc' | 'asc' = 'desc';
  isLoading = true;
  errorMessage = '';

  constructor(private articleService: ArticleService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.isLoading = true;
    this.articleService.getFeed(this.sortOrder).subscribe({
      next: (data) => {
        this.articles = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les articles.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleSort(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.loadArticles();
  }
}
