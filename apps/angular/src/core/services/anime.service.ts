import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pagination } from '@js-camp/core/models/pagination.dto';

import { ResponseWithPaginationDto } from '@js-camp/core/utils/response-with-pagination.utils';

import { paginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { TAnimeDto } from '../dtos/anime.dto';
import { TAnime } from '../models/anime';
import { animeMapper } from '../mappers/anime.mapper';

@Injectable({
	providedIn: 'root',
})

// eslint-disable-next-line jsdoc/require-jsdoc
export class AnimeService {
	private readonly baseUrl = 'https://api.camp-js.saritasa.rocks/api/v1/';

	private readonly httpClient = inject(HttpClient);

	/**
	 * Todo.
	 * @param options Todo.
	 * @returns Todo.
	 */
	public getAllAnime(options: { pageNumber: number; }): Observable<Pagination<TAnime>> {
		const params = new HttpParams()
			.set('offset', options.pageNumber.toString());

		const url = `${this.baseUrl}anime/anime/`;

		return this.httpClient.get<ResponseWithPaginationDto<TAnimeDto>>(url, { params }).pipe(
			map(response => paginationMapper(response, animeMapper.fromDto)),
		);
	}
}
