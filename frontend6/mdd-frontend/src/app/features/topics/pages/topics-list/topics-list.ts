import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicService, TopicResponse } from '../../../../core/services/topic';
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-topics-list',
  imports: [CommonModule, Navbar],
  templateUrl: './topics-list.html',
  styleUrl: './topics-list.scss',
})
export class TopicsList implements OnInit {
  topics: TopicResponse[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private topicService: TopicService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.isLoading = true;
    this.topicService.getAllTopics().subscribe({
      next: (data) => {
        this.topics = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les thèmes.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleSubscription(topic: TopicResponse): void {
    if (topic.subscribed) {
      this.topicService.unsubscribe(topic.id).subscribe({
        next: () => { topic.subscribed = false; this.cdr.detectChanges(); },
        error: () => { this.errorMessage = 'Erreur lors du désabonnement.'; this.cdr.detectChanges(); }
      });
    } else {
      this.topicService.subscribe(topic.id).subscribe({
        next: () => { topic.subscribed = true; this.cdr.detectChanges(); },
        error: () => { this.errorMessage = "Erreur lors de l'abonnement."; this.cdr.detectChanges(); }
      });
    }
  }
}
