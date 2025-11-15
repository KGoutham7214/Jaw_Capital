import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'what-we-do',
    loadComponent: () => import('./pages/what-we-do-page/what-we-do-page.component').then(m => m.WhatWeDoPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: 'resources',
    loadComponent: () => import('./pages/resources-page/resources-page.component').then(m => m.ResourcesPageComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy-page/privacy-policy-page.component').then(m => m.PrivacyPolicyPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
