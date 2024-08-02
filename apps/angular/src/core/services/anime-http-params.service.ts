import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AnimeManageParamsDto } from '@js-camp/core/dtos/anime-manage-params.dto';
import { AnimeManageParamsMapper } from '@js-camp/core/mappers/anime-manage-params.mapper';
import { AnimeManageParams } from '@js-camp/core/models/anime-manage-params';

/** Http Params Service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeHttpParamsService {
	private readonly animeFilterParams = inject(AnimeManageParamsMapper);

	private buildHttpParamsFromDto(params: AnimeManageParamsDto.Combined): HttpParams {
		let httpParams = new HttpParams();

		if (params.search !== undefined) {
			httpParams = httpParams.set('search', params.search);
		}
		if (params.offset !== undefined) {
			httpParams = httpParams.set('offset', params.offset.toString());
		}
		if (params.limit !== undefined) {
			httpParams = httpParams.set('limit', params.limit.toString());
		}
		if (params.ordering !== undefined) {
			httpParams = httpParams.set('ordering', params.ordering);
		}
		if (params.type !== undefined) {
			httpParams = httpParams.set('type', params.type);
		}
		return httpParams;
	}

	/**
	 * Build HttpParams from URL query params.
	 * @param params URL query params.
	 * @returns Http params.
	 */
	public getHttpParams(params: AnimeManageParams.Combined): HttpParams {
		const dtoQueryParams = this.animeFilterParams.toDto(params);
		return this.buildHttpParamsFromDto(dtoQueryParams);
	}

}
