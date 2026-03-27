import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService, UpdateProfileRequest } from '../../../../core/services/user-service';
import { TopicService } from '../../../../core/services/topic';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit { 
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage = '';
  successMessage = '';

  constructor(private location: Location,
    private userService : UserService,
    private topicService : TopicService,
    private cdr: ChangeDetectorRef
  ) {}

  goBack(): void {
    this.location.back();
  };

  subscriptions :{
    id: number, title: string, description: string }[] =[] ;
  
  ngOnInit():void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.username = profile.username;
        this.email = profile.email;
        this.subscriptions = profile.subscriptions.map(s => ({
          id: s.id,
          title: s.title,
          description: s.description
        }));
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Failed to load profile.';
        this.cdr.markForCheck();
      }
    })
  }
  saveProfile(): void {
    const request: UpdateProfileRequest = {
      username: this.username,
      email: this.email,
      ...(this.password?.trim() ? {newPassword: this.password } : {})
    };
    this.userService.updateProfile(request).subscribe({
      next: () => {
        this.successMessage = 'Profile saved successfully';
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Failed to save profile';
        this.cdr.markForCheck();
      }
    });
  }

  unsubscribe(subscriptionId: number): void {
    this.topicService.unsubscribe(subscriptionId).subscribe({
      next: () => {
        this.subscriptions = this.subscriptions.filter(s => s.id !== subscriptionId);
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Failed to unsubscribe';
        this.cdr.markForCheck();
      }
    });
  }
}
