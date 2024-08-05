import { Routes } from '@angular/router';

/** App routes. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent),
	},

];
