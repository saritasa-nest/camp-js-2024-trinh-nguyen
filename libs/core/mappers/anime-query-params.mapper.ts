
import { Injectable } from '@angular/core';

import { AnimeManageParams } from '../models/anime-manage-params';

import { DEFAULT_PAGINATION_OPTIONS } from '../constants/pagination';

import { StrictOmit } from '../utils/strcit-omit';

import { getSortDirection } from '../models/sort-options';

import { AnimeTypeDto } from '../dtos/anime-type.dto';

import { MAP_ANIME_TYPE_TO_DTO } from '../records/anime-type-to-dto';
import { MAP_ANIME_TYPE_FROM_DTO } from '../records/anime-type-from-dto';

import { Mapper } from './mapper';

/** Anime query params. */
export type AnimeQueryParams = Partial<StrictOmit<AnimeManageParams.Combined, 'sortOptions' | 'type'> & {

	/** Anime type dto. */
	type: AnimeTypeDto;

	/** Page number query param. */
	field: 	string | null;

	/** Page size query param. */
	direction: string | null;
}>;

/** Service for handling URL query params. */
@Injectable({
	providedIn: 'root',
})
export class AnimeQueryParamsMapper implements Mapper<AnimeQueryParams, AnimeManageParams.Combined> {
	/** @inheritdoc */
	public fromDto(dto: AnimeQueryParams): AnimeManageParams.Combined {
		return {
			type: (dto.type !== undefined && dto.type !== null) ? MAP_ANIME_TYPE_FROM_DTO[dto.type] : null,
			pageNumber: dto.pageNumber ? Number(dto.pageNumber) : DEFAULT_PAGINATION_OPTIONS.pageNumber,
			pageSize: dto.pageSize ? Number(dto.pageSize) : DEFAULT_PAGINATION_OPTIONS.pageSize,
			search: (dto.search && dto.search !== '') ? dto.search : null,
			sortOptions: (dto.field && dto.direction) ?
				{
					field: dto.field,
					direction: getSortDirection(dto.direction),
				} : null,
		};
	}

	/** @inheritdoc */
	public toDto(model: Partial<AnimeManageParams.Combined>): AnimeQueryParams {
		return {
			type: (model.type !== undefined && model.type !== null) ? MAP_ANIME_TYPE_TO_DTO[model.type] : undefined,
			pageNumber: model.pageNumber !== undefined && model.pageNumber !== null && model.pageNumber >= 0 ? model.pageNumber : undefined,
			pageSize: model.pageSize ? model.pageSize : undefined,
			search: model.search !== undefined ? model.search : undefined,
			field: model.sortOptions?.field ? model.sortOptions.field : undefined,
			direction: model.sortOptions ? model.sortOptions.direction : undefined,

		};
	}
}
