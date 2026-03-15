import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  username: string = '';
  email: string = '';
  password: string = '';

  ngOnInit():void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.username = 'username';
    this.email = 'email@email.fr';
  }
  saveProfile(): void {
    console.log('Saving profile: ', { username: this.username })
  }
}
