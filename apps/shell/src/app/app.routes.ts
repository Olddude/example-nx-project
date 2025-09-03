import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@olddude/angular-shared')
      .then((m) => m.HomePage)
  },
  {
    path: 'microfrontend-one',
    loadChildren: () =>
      loadRemoteModule('microfrontendOne', './Routes')
        .then((m) => m.remoteRoutes)
        .catch(() => []),
  },
];