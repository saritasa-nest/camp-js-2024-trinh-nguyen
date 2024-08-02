
import { Injectable } from '@angular/core';

import { AnimeManageParams } from '../models/anime-manage-params';

import { DEFAULT_PAGINATION_OPTIONS } from '../constants/pagination';

import { StrictOmit } from '../utils/strcit-omit';

import { SortDirection } from '../models/sort-options';

import { MAP_ANIME_SORT_FIELDS_FROM_DTO } from '../records/anime-sort-field-from-dto';

import { AnimeSortFieldsDto } from '../dtos/anime-sort-fields.dto';

import { MAP_ANIME_SORT_FIELDS_TO_DTO } from '../records/anime-sort-field-to-dto';

import { Mapper } from './mapper';

/** Anime query params. */
export type AnimeQueryParams = Partial<StrictOmit<AnimeManageParams.Combined, 'sortOptions'> & {

	/** Page number query param. */
	field: 	AnimeSortFieldsDto | null;

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
			type: dto.type ?? null,
			pageNumber: dto.pageNumber ? Number(dto.pageNumber) : DEFAULT_PAGINATION_OPTIONS.pageNumber,
			pageSize: dto.pageSize ? Number(dto.pageSize) : DEFAULT_PAGINATION_OPTIONS.pageSize,
			search: dto.search ?? null,
			sortOptions: (dto.field && dto.direction) ?
				{
					field: MAP_ANIME_SORT_FIELDS_FROM_DTO[dto.field],
					direction: dto.direction as SortDirection,
				} : null,
		};
	}

	/** @inheritdoc */
	public toDto(model: Partial<AnimeManageParams.Combined>): AnimeQueryParams {
		return {
			type: model.type !== undefined ? model.type : undefined,
			pageNumber: model.pageNumber && model.pageNumber >= 0 ? model.pageNumber : undefined,
			pageSize: model.pageSize ? model.pageSize : undefined,
			search: model.search !== undefined ? model.search : undefined,
			field: model.sortOptions?.field ? MAP_ANIME_SORT_FIELDS_TO_DTO[model.sortOptions.field] : undefined,
			direction: model.sortOptions ? model.sortOptions.direction : undefined,

		};
	}
}
