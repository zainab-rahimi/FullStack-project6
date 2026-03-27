import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/auth/pages/home/home').then(m => m.Home) },
  { path: 'register', loadComponent: () => import('./features/auth/pages/register/register').then(m => m.Register) },
  { path: 'login', loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login) },
  { path: 'articles', loadComponent: () => import('./features/articles/pages/feed/feed').then(m => m.Feed), canActivate: [authGuard] },
  { path: 'articles/create', loadComponent: () => import('./features/articles/pages/article-create/article-create').then(m => m.ArticleCreate), canActivate: [authGuard] },
  { path: 'articles/:id', loadComponent: () => import('./features/articles/pages/article-detail/article-detail').then(m => m.ArticleDetail), canActivate: [authGuard] },
  { path: 'topics', loadComponent: () => import('./features/topics/pages/topics-list/topics-list').then(m => m.TopicsList), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./features/user/pages/profile/profile').then(m => m.Profile), canActivate: [authGuard] },
];
