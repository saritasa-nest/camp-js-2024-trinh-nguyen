import { Component } from '@angular/core';

import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Dashboard component. */
@Component({
	selector: 'camp-dashboard',
	templateUrl: './dashboard.component.html',
	standalone: true,
	imports: [AnimeTableComponent],
})
export class DashboardComponent {}
