import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environement';

export interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  authorUsername: string;
  topicName: string;
  createdAt: string;
  comments: CommentResponse[];
}

export interface CommentResponse {
  id: number;
  content: string;
  authorUsername: string;
  createdAt: string;
}

export interface ArticleRequest {
  title: string;
  content: string;
  topicId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  getFeed(sort: string = 'desc'): Observable<ArticleResponse[]> {
    const params = new HttpParams().set('sort', sort);
    return this.http.get<ArticleResponse[]>(`${this.baseUrl}/feed`, { params });
  }

  getArticle(id: number): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(`${this.baseUrl}/${id}`);
  }

  createArticle(request: ArticleRequest): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(this.baseUrl, request);
  }

  addComment(articleId: number, request: { content: string }): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(`${this.baseUrl}/${articleId}/comments`, request);
  }
}
