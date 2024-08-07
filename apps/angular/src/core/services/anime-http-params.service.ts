/* eslint-disable jsdoc/require-jsdoc */
import { Injectable } from '@angular/core';
import { AnimeManageParamsDto } from '@js-camp/core/dtos/anime-manage-params.dto';
import { AnimeManageParams } from '@js-camp/core/models/anime-manage-params';

import { AnimeManageParamsMapper } from '@js-camp/core/mappers/anime-manage-params.mapper';

import { GenericHttpParamsService } from './http-params.service';

/** Http Params Service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeHttpParamsService extends GenericHttpParamsService<AnimeManageParamsDto.Combined, AnimeManageParams.Combined> {

	public constructor() {
		super(new AnimeManageParamsMapper());
	}

}
