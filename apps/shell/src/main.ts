import { initFederation } from '@angular-architects/module-federation';

// Initialize the Module Federation manifest before bootstrapping the app
initFederation('/assets/mf.manifest.json')
	.catch((err) => {
		console.error('MF manifest init failed', err);
	})
	.finally(() => {
		import('./bootstrap');
	});
