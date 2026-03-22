import { Routes } from '@angular/router';
import { languageGuard } from './core/canActivate';

export const routes: Routes = [
  {
    path: ':language',
    canActivate: [languageGuard],
    loadComponent: () =>
      import('./app').then(m => m.App)
  },
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'en',
  }
]