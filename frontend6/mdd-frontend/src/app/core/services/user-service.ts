import { Injectable } from '@angular/core';
import {environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface UserProfileResponse {
  id: number;
  username: string;
  email: string;
  subscriptions: any[];
}

export interface UpdateProfileRequest {
  username: string;
  email: string;
  newPassword?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/user`; 
  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${this.baseUrl}/me`)
  }

  updateProfile(request: UpdateProfileRequest): Observable<UserProfileResponse> {
    return this.http.put<UserProfileResponse>(`${this.baseUrl}/me`,request)
  }

}
