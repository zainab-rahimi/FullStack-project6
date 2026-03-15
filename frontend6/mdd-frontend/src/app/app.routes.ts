import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/auth/pages/home/home').then(m => m.Home) },
  { path: 'register', loadComponent: () => import('./features/auth/pages/register/register').then(m => m.Register) },
  { path: 'login', loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login) },
  { path: 'articles', loadComponent: () => import('./features/articles/pages/feed/feed').then(m => m.Feed) },
  { path: 'articles/create', loadComponent: () => import('./features/articles/pages/article-create/article-create').then(m => m.ArticleCreate) },
  { path: 'articles/:id', loadComponent: () => import('./features/articles/pages/article-detail/article-detail').then(m => m.ArticleDetail) },
  { path: 'topics', loadComponent: () => import('./features/topics/pages/topics-list/topics-list').then(m => m.TopicsList) },
  { path: 'profile', redirectTo: '', pathMatch: 'full' },
];
