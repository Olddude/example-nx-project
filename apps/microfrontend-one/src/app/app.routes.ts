import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '/',
    loadComponent: () => import('@example-nx-project/angular-components')
      .then((m) => m.ExampleComponent)
  }
];
