import { Injectable, inject } from '@angular/core';
import { AnimeManageParams } from '@js-camp/core/models/anime-manage-params';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

import { QueryParamsService } from './query-params.service';

/** Jobs query params service. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsService {
	private readonly queryParamsService = inject(QueryParamsService);

	private readonly animeQueryParams = inject(AnimeQueryParamsMapper);

	/**
	 * Append query params.
	 * @param params Job filter params.
	 */
	public append(params: Partial<AnimeManageParams>): void {
		const queryParams = this.animeQueryParams.toDto(params);
		this.queryParamsService.append(queryParams);
	}

	/**
	 * Append provide query params and reset page number params to the URL.
	 * @param params Job filter params to append.
	 */
	public appendParamsAndResetPageNumber(params: Partial<AnimeManageParams>): void {
		const queryParams = this.animeQueryParams.toDto(params);
		return this.queryParamsService.appendParamsAndResetPageNumber(queryParams);
	}
}
