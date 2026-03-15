import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentResponse } from '../../../core/services/article';

@Component({
  selector: 'app-comment-card',
  imports: [CommonModule],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.scss',
})
export class CommentCard {
  @Input() comment!: CommentResponse;
}
