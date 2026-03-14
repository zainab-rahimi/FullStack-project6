import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticleResponse } from '../../../core/services/article';

@Component({
  selector: 'app-article-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  @Input() article!: ArticleResponse;
}
