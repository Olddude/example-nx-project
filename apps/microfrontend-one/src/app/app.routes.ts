import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '/',
    loadComponent: () => import('@example-nx-project/angular-shared')
      .then((m) => m.ExampleComponent)
  }
];
