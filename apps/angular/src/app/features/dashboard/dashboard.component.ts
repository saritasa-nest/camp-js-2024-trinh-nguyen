import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TAnime } from '@js-camp/angular/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Pagination } from '@js-camp/core/models/pagination.dto';

import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Anime table component. */
@Component({
	selector: 'camp-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	standalone: true,
	imports: [AnimeTableComponent],
})
export class DashboardComponent {
	private readonly animeResponse$: Observable<Pagination<TAnime>>;

	private readonly animeService: AnimeService = inject(AnimeService);

	/** Anime list fetch from back-end api. */
	protected animeList: TAnime[] = [];

	public constructor() {
		this.animeResponse$ = this.animeService.getAnime({ pageNumber: 0 });

		this.animeResponse$.subscribe(response => {
			this.animeList = [...response.items];
		});
	}
}
