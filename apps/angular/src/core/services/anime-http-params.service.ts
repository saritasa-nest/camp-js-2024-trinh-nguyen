import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AnimeManageParams } from '@js-camp/core/models/anime-manage-params';
import { AnimeManageParamsMapper } from '@js-camp/core/mappers/anime-manage-params.mapper';
import { AnimeManageParamsDto } from '@js-camp/core/dtos/anime-manage-params.dto';

import { buildHttpParamsFromDto } from '../utils/http-params';

/** Handle http params service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeParamsService {
	private readonly animeManageMapper = inject(AnimeManageParamsMapper);

	/**
	 * Get anime http params.
	 * @param paramsModel Anime params model.
	 */
	public getHttpParams(paramsModel: AnimeManageParams): HttpParams {

		const dto = this.animeManageMapper.toDto(paramsModel);
		return buildHttpParamsFromDto<AnimeManageParamsDto>(dto);
	}
}
