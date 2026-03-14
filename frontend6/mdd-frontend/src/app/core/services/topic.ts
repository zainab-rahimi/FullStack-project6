import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environement';

export interface TopicResponse {
  id: number;
  name: string;
  description: string;
  subscribed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private baseUrl = `${environment.apiUrl}/topics`;

  constructor(private http: HttpClient) {}

  getAllTopics(): Observable<TopicResponse[]> {
    return this.http.get<TopicResponse[]>(this.baseUrl);
  }

  subscribe(topicId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${topicId}/subscribe`, {});
  }

  unsubscribe(topicId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${topicId}/subscribe`);
  }
}
