import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCreate implements OnInit {
  articleForm: FormGroup;
  topics: TopicResponse[] = [];
  isLoading = false;
  errorMessage = '';
  dropdownOpen = false;
  selectedTopicName = '';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select-wrapper')) {
      this.dropdownOpen = false;
      this.cdr.markForCheck();
    }
  }

  selectTopic(topic: TopicResponse): void {
    this.articleForm.get('topicId')!.setValue(topic.id);
    this.articleForm.get('topicId')!.markAsTouched();
    this.selectedTopicName = topic.name;
    this.dropdownOpen = false;
    this.cdr.markForCheck();
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    this.cdr.markForCheck();
  }

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private topicService: TopicService,
    private router: Router,
    private cdr: ChangeDetectorRef
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
        this.topics = data.filter((topic) => topic.subscribed);
        this.cdr.markForCheck();
      },

      error: () => {
        this.errorMessage = 'Impossible de charger les thèmes.';
        this.cdr.markForCheck();
      }
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
    this.cdr.markForCheck();

    const request = {
      ...this.articleForm.value,
      topicId: Number(this.articleForm.value.topicId)
    };

    this.articleService.createArticle(request).subscribe({
      next: () => {
        this.router.navigate(['/articles']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Impossible de créer l\'article.';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
