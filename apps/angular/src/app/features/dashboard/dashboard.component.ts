import { Component } from '@angular/core';

import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Anime table component. */
@Component({
	selector: 'camp-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	standalone: true,
	imports: [AnimeTableComponent],
})
export class DashboardComponent {}
