import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  username: string = '';
  email: string = '';
  password: string = '';

  subscriptions = [
    {id: 1, title: 'Titre du thème', description: 'Description: blablabla'},
    {id: 2, title: 'Titre du thème', description: 'Description: bla bla bla'}
  ]

  ngOnInit():void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.username = 'username';
    this.email = 'email@email.fr';
  }
  saveProfile(): void {
    console.log('Saving profile: ', { username: this.username, email: this.email, password: this.password})
  }
  unsubscribe(subscriptionId: number): void {
    this.subscriptions = this.subscriptions.filter(s => s.id !==subscriptionId)
  }
}
