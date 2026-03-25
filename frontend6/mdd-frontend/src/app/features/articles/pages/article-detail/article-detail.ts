import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService, ArticleResponse } from '../../../../core/services/article';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { CommentCard } from '../../../../shared/components/comment-card/comment-card';

@Component({
  selector: 'app-article-detail',
  imports: [CommonModule, FormsModule, Navbar, CommentCard],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetail implements OnInit {
  article: ArticleResponse | null = null;
  isLoading = true;
  errorMessage = '';
  newComment = '';
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticle(id).subscribe({
      next: (data) => {
        this.article = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = "Impossible de charger l'article.";
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }

  submitComment(): void {
    if (!this.newComment.trim() || !this.article) return;
    this.isSubmitting = true;
    this.articleService.addComment(this.article.id, { content: this.newComment.trim() }).subscribe({
      next: (comment) => {
        this.article!.comments.push(comment);
        this.newComment = '';
        this.isSubmitting = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }
}

