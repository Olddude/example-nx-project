import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@olddude/angular-shared')
      .then((m) => m.HomePage)
  },
  {
    path: 'microfrontend-one',
    loadChildren: () =>
      import('microfrontendOne/Routes').then((m) => m.remoteRoutes),
  },
];