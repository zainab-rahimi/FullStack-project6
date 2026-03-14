import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../../core/services/article';
import { TopicService, TopicResponse } from '../../../../core/services/topic';
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-article-create',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, Navbar],
  templateUrl: './article-create.html',
  styleUrl: './article-create.scss',
})
export class ArticleCreate implements OnInit {
  articleForm: FormGroup;
  topics: TopicResponse[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private topicService: TopicService,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      topicId: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.topicService.getAllTopics().subscribe({
      next: (data) => {
        this.topics = data;
        this.topics = this.topics.filter((topic) => {
          return topic.subscribed
        });
      },

      error: () => this.errorMessage = 'Impossible de charger les th\u00e8mes.'
    });
  }

  get topicId() { return this.articleForm.get('topicId'); }
  get title() { return this.articleForm.get('title'); }
  get content() { return this.articleForm.get('content'); }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request = {
      ...this.articleForm.value,
      topicId: Number(this.articleForm.value.topicId)
    };

    this.articleService.createArticle(request).subscribe({
      next: () => {
        this.router.navigate(['/articles']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Impossible de cr\u00e9er l\'article.';
        this.isLoading = false;
      }
    });
  }
}
