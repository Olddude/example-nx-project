import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    // eslint-disable-next-line @nx/enforce-module-boundaries
    loadComponent: () => import('@olddude/angular-shared')
      .then((m) => m.HomePage)
  },
  {
    path: 'microfrontend-one',
    loadChildren: () =>
      import('microfrontendOne/Routes').then((m) => m.remoteRoutes),
  },
];