import { inject, Injectable } from '@angular/core';

import { AnimeManageParamsDto } from '../dtos/anime-manage-params.dto';
import { AnimeManageParams } from '../models/anime-manage-params';

import { MAP_ANIME_SORT_FIELDS_TO_DTO } from '../records/anime-sort-field-to-dto';

import { MAP_ANIME_TYPE_TO_DTO } from '../records/anime-type-to-dto';

import { AnimeType } from '../models/anime-type';
import { AnimeSortFields } from '../models/anime-sort-fields';
import { SortDirection } from '../models/sort-options';

import { DEFAULT_PAGINATION_OPTIONS } from '../constants/pagination';

import { BaseFilterParamsMapper } from './base-filter-params.mapper';
import { Mapper } from './mapper';
import { SortMapper } from './sort.mapper';

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeManageParamsMapper implements Mapper<AnimeManageParamsDto, AnimeManageParams> {
	private readonly sortMapper = inject(SortMapper);

	private readonly baseFilterParamsMapper = inject(BaseFilterParamsMapper);

	/** @inheritdoc */
	public toDto(model: AnimeManageParams): AnimeManageParamsDto {
		return {
			...this.baseFilterParamsMapper.mapCombinedOptionsToDto(model),
			type: model.type ? MAP_ANIME_TYPE_TO_DTO[model.type] : undefined,
			ordering: model.sortOptions ? this.sortMapper.toDto(model.sortOptions, MAP_ANIME_SORT_FIELDS_TO_DTO) : undefined,

		};
	}

	/** @inheritdoc */
	public fromDto(dto: AnimeManageParamsDto): AnimeManageParams {
		return {
			pageNumber: dto.offset ?? DEFAULT_PAGINATION_OPTIONS.pageNumber,
			pageSize: DEFAULT_PAGINATION_OPTIONS.pageSize,
			search: '',
			type: AnimeType.Music,
			sortOptions: {
				field: AnimeSortFields.Aired,
				direction: SortDirection.Ascending,

			},
		};
	}
}
