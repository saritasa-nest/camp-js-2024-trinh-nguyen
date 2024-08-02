import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/urlConfig';
import { AnimeManageParams } from '@js-camp/core/models/anime-manage-params';

import { AnimeHttpParamsService } from './anime-http-params.service';

/** Anime service implement fetch data from back-end api and execute logic data related to Anime object. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {

	private cacheAnimePagination$!: Observable<Pagination<Anime>>;

	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly paginationMapper = inject(PaginationMapper);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly httpParamsService = inject(AnimeHttpParamsService);

	/**
	 * //TODO.
	 * @param model TODO.
	 */
	public getAnime(model: AnimeManageParams.Combined): void {
		if (!this.cacheAnimePagination$) {
			this.cacheAnimePagination$ = this.requestAnime(model).pipe(
				shareReplay({ refCount: true, bufferSize: 1 }),
			);
		}
	}

	/**
	 * Get anime list.
	 * @param model Params to next/prev page.
	 */
	public requestAnime(model: AnimeManageParams.Combined): Observable<Pagination<Anime>> {

		const params = this.httpParamsService.getHttpParams(model);

		return this.httpClient.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params }).pipe(
			map(response => this.paginationMapper.mapPaginationFromDto(response, this.animeMapper.fromDto)),
		);
	}
}
