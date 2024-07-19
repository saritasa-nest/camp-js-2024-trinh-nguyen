import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pagination } from '@js-camp/core/models/pagination.dto';

import { ResponseWithPaginationDto } from '@js-camp/core/utils/response-with-pagination.utils';

import { paginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { environment } from '@js-camp/angular/environments/environment';

import { TAnimeDto } from '../dtos/anime.dto';
import { TAnime } from '../models/anime';
import { animeMapper } from '../mappers/anime.mapper';

/** Anime service implement fetch data from back-end api and execute logic data related to Anime object. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly baseUrl = environment.api;

	private readonly httpClient = inject(HttpClient);

	/**
	 * Get anime list.
	 * @param options Todo.
	 * @returns Todo.
	 */
	public getAnime(options: { pageNumber: number; }): Observable<Pagination<TAnime>> {
		const params = new HttpParams()
			.set('offset', (options.pageNumber * 25).toString());

		const url = `${this.baseUrl}anime/anime/`;

		return this.httpClient.get<ResponseWithPaginationDto<TAnimeDto>>(url, { params }).pipe(
			map(response => paginationMapper(response, animeMapper.fromDto)),
		);
	}
}
