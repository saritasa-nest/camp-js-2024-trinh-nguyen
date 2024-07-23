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
	/** Receive api response async. */
	public animeResponse$: Observable<Pagination<TAnime>>;

	private readonly animeService: AnimeService = inject(AnimeService);

	/** Anime list fetch from back-end api. */
	protected animeList: TAnime[] = [];

	private page: number;

	public constructor() {
		this.page = 0;
		this.animeResponse$ = this.animeService.getAnime({ pageNumber: 0 });
	}

	/**
	 * Function return api for current page when use click "next/prev" button.
	 * @param page The index page.
	 */
	public loadPage(page: number): void {
		this.animeResponse$ = this.animeService.getAnime({ pageNumber: page });
	}

	// eslint-disable-next-line jsdoc/require-jsdoc
	public nextPage(): void {

		this.animeResponse$.subscribe(pagination => {
			if (pagination.hasNext) {
				this.loadPage(++this.page);
			}
		});
	}

	// eslint-disable-next-line jsdoc/require-jsdoc
	public prevPage(): void {
		this.animeResponse$.subscribe(pagination => {
			if (pagination.hasPrev) {
				this.loadPage(--this.page);
			}
		});
	}
}
