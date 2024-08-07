import { inject, Injectable } from '@angular/core';

import { AnimeManageParamsDto } from '../dtos/anime-manage-params.dto';
import { AnimeManageParams } from '../models/anime-manage-params';

import { MAP_ANIME_SORT_FIELDS_TO_DTO } from '../records/anime-sort-field-to-dto';

import { MAP_ANIME_TYPE_TO_DTO } from '../records/anime-type-to-dto';

import { AnimeType } from '../models/anime-type';
import { AnimeSortFields } from '../models/anime-sort-fields';
import { SortDirection } from '../models/sort-options';

import { BaseFilterParamsMapper } from './base-filter-params.mapper';
import { Mapper } from './mapper';
import { SortMapper } from './sort.mapper';

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeManageParamsMapper implements Mapper<AnimeManageParamsDto.Combined, AnimeManageParams.Combined> {
	private readonly sortMapper = inject(SortMapper);

	private readonly baseFilterParamsMapper = inject(BaseFilterParamsMapper);

	private mapOrderingOptionToDto(model: AnimeManageParams.Sort): AnimeManageParamsDto.Sort | null {

		if (model.sortOptions?.direction && model.sortOptions?.field) {

			return {
				ordering: this.sortMapper.toDto(model.sortOptions, MAP_ANIME_SORT_FIELDS_TO_DTO),
			};
		}

		return null;
	}

	private mapTypeOptionToDto(model: AnimeManageParams.Type): AnimeManageParamsDto.Type | null {
		if (model.type) {
			return {
				type: MAP_ANIME_TYPE_TO_DTO[model.type],
			};
		}
		return null;
	}

	/** @inheritdoc */
	public toDto(model: AnimeManageParams.Combined): AnimeManageParamsDto.Combined {
		return {
			...this.baseFilterParamsMapper.mapCombinedOptionsToDto(model),
			...this.mapOrderingOptionToDto(model),
			...this.mapTypeOptionToDto(model),
		};
	}

	/** @inheritdoc */
	public fromDto(dto: AnimeManageParamsDto.Combined): AnimeManageParams.Combined {
		return {
			pageNumber: dto.offset ?? 1,
			pageSize: 10,
			search: '',
			type: AnimeType.Music,
			sortOptions: {
				field: AnimeSortFields.Aired,
				direction: SortDirection.Ascending,

			},
		};
	}
}
