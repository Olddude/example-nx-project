import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@olddude/angular-shared')
      .then((m) => m.HomePage)
  },
  {
    path: 'microfrontend-one',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'microfrontendOne',
        exposedModule: './Routes',
      })
        .then((m) => m.remoteRoutes)
        .catch(() => []),
  },
];