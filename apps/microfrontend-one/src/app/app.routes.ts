import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@olddude/angular-shared')
      .then((m) => m.HomePage)
  }
];
