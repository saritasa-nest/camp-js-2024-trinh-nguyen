
import { Injectable } from '@angular/core';

import { AnimeManageParams } from '../models/anime-manage-params';

import { DEFAULT_PAGINATION_OPTIONS } from '../constants/pagination';

import { StrictOmit } from '../utils/strcit-omit';

import { getSortDirection } from '../models/sort-options';

import { AnimeTypeUrlDto } from '../dtos/anime-type.dto';

import { MAP_ANIME_TYPE_TO_URL_DTO } from '../records/anime-type-to-dto';
import { MAP_ANIME_TYPE_FROM_URL_DTO } from '../records/anime-type-from-dto';

import { AnimeSortFieldsUrlDto } from '../dtos/anime-sort-fields.dto';

import { MAP_ANIME_SORT_FIELDS_TO_URL_DTO } from '../records/anime-sort-field-to-dto';

import { MAP_ANIME_SORT_FIELDS_FROM_URL_DTO } from '../records/anime-sort-field-from-dto';

import { Mapper } from './mapper';

/** Anime query params. */
export type AnimeQueryParams = Partial<StrictOmit<Partial<AnimeManageParams>, 'sortOptions' | 'type'> & {

	/** Anime type dto. */
	type: AnimeTypeUrlDto;

	/** Page number query param. */
	field: 	AnimeSortFieldsUrlDto | null;

	/** Page size query param. */
	direction: string | null;
}>;

/** Service for handling URL query params. */
@Injectable({
	providedIn: 'root',
})
export class AnimeQueryParamsMapper implements Mapper<AnimeQueryParams, Partial<AnimeManageParams>> {
	/** @inheritdoc */
	public fromDto(dto: AnimeQueryParams): Partial<AnimeManageParams> {
		return {
			type: (dto.type != null) ? MAP_ANIME_TYPE_FROM_URL_DTO[dto.type] : null,
			pageNumber: dto.pageNumber ? Number(dto.pageNumber) : DEFAULT_PAGINATION_OPTIONS.pageNumber,
			pageSize: dto.pageSize ? Number(dto.pageSize) : DEFAULT_PAGINATION_OPTIONS.pageSize,
			search: (dto.search && dto.search !== '') ? dto.search : null,
			sortOptions: (dto.field && dto.direction) ?
				{
					field: MAP_ANIME_SORT_FIELDS_FROM_URL_DTO[dto.field],
					direction: getSortDirection(dto.direction),
				} : null,
		};
	}

	/** @inheritdoc */
	public toDto(model: Partial<AnimeManageParams>): AnimeQueryParams {
		return {
			type: (model.type != null) ? MAP_ANIME_TYPE_TO_URL_DTO[model.type] : undefined,
			pageNumber: model.pageNumber != null && model.pageNumber >= 0 ? model.pageNumber : undefined,
			pageSize: model.pageSize ? model.pageSize : undefined,
			search: model.search !== undefined ? model.search : undefined,
			field: model.sortOptions?.field ? MAP_ANIME_SORT_FIELDS_TO_URL_DTO[model.sortOptions.field] : undefined,
			direction: model.sortOptions ? model.sortOptions.direction : undefined,

		};
	}
}
