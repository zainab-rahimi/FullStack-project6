import { Component, OnInit, signal } from '@angular/core';
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
})
export class ArticleDetail implements OnInit {
  article = signal<ArticleResponse | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');
  newComment = signal('');
  isSubmitting = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticle(id).subscribe({
      next: (data) => {
        this.article.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set("Impossible de charger l'article.");
        this.isLoading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }

  submitComment(): void {
    const content = this.newComment().trim();
    const currentArticle = this.article();
    if (!content || !currentArticle) return;
    this.isSubmitting.set(true);
    this.articleService.addComment(currentArticle.id, { content }).subscribe({
      next: (comment) => {
        this.article.update(a => a ? { ...a, comments: [...a.comments, comment] } : a);
        this.newComment.set('');
        this.isSubmitting.set(false);
      },
      error: () => {
        this.isSubmitting.set(false);
      }
    });
  }
}
