import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/pages/login/login.page').then(m => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/pages/register/register.page').then(m => m.RegisterPage),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./auth/pages/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'search',
        loadComponent: () => import('./tabs/search/search.page').then(m => m.SearchPage),
      },
      {
        path: 'schedule',
        loadComponent: () => import('./tabs/schedule/schedule.page').then(m => m.SchedulePage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./tabs/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'balance',
    loadComponent: () => import('./tabs/profile/balance/balance.page').then(m => m.BalancePage),
  },

  {
    path: 'edit-profile',
    loadComponent: () => import('./tabs/profile/edit-profile/edit-profile.page').then(m => m.EditProfilePage),
  },

  {
    path: 'edit-service/:id',
    loadComponent: () => import('./tabs/profile/edit-service/edit-service.page').then(m => m.EditServicePage),
  },

  { path: '**', redirectTo: 'auth/login' },
];