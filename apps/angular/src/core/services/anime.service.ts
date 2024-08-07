import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/urlConfig';

import { AnimeHttpParamsService } from './anime-http-params.service';

/** Anime service implement fetch data from back-end api and execute logic data related to Anime object. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly paginationMapper = inject(PaginationMapper);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly httpParamsService = inject(AnimeHttpParamsService);

	/**
	 * Get anime list.
	 * @param params Params to next/prev page.
	 */
	public requestAnime(params: HttpParams): Observable<Pagination<Anime>> {

		return this.httpClient.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params }).pipe(

			map(response => this.paginationMapper.mapPaginationFromDto(response, this.animeMapper.fromDto)),

		);
	}
}
