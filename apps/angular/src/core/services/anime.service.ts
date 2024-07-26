import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pagination } from '@js-camp/core/models/pagination.dto';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { environment } from '@js-camp/angular/environments/environment.prod';

import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';
import { AnimeMapper } from '../mappers/anime.mapper';

const ITEM_PER_PAGE = 25;

/** Anime service implement fetch data from back-end api and execute logic data related to Anime object. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly baseUrl = environment.api;

	private readonly httpClient = inject(HttpClient);

	private readonly paginationMapper = inject(PaginationMapper);

	private readonly animeMapper = inject(AnimeMapper);

	/**
	 * Get anime list.
	 * @param options Params to next/prev page.
	 */
	public getAnime(options: { pageNumber: number; }): Observable<Pagination<Anime>> {
		const params = new HttpParams()
			.set('limit', ITEM_PER_PAGE)
			.set('offset', (options.pageNumber * ITEM_PER_PAGE).toString());

		const url = new URL('anime/anime/', this.baseUrl);

		return this.httpClient.get<PaginationDto<AnimeDto>>(url.toString(), { params }).pipe(
			map(response => this.paginationMapper.mapPaginationFromDto(response, this.animeMapper.fromDto)),
		);
	}
}
