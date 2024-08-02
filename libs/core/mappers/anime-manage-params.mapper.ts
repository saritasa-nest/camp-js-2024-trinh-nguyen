import { inject, Injectable } from '@angular/core';

import { AnimeManageParamsDto } from '../dtos/anime-manage-params.dto';
import { AnimeManageParams } from '../models/anime-manage-params';

import { DEFAULT_PAGINATION_OPTIONS } from '../constants/pagination';

import { MAP_ANIME_SORT_FIELDS_TO_DTO } from '../records/anime-sort-field-to-dto';

import { MAP_ANIME_TYPE_TO_DTO } from '../records/anime-type-to-dto';

import { MapperToDto } from './mapper';
import { SortMapper } from './sort.mapper';

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeManageParamsMapper implements MapperToDto<AnimeManageParamsDto.Combined, AnimeManageParams.Combined> {
	private readonly sortMapper = inject(SortMapper);

	private mapPaginationOptionsToDto(model: AnimeManageParams.Pagination): AnimeManageParamsDto.Pagination | null {
		if (model.pageNumber !== null && model.pageSize !== null) {
			return {
				offset: model.pageNumber * model.pageSize,
				limit: model.pageSize,
			};
		}
		return {
			offset: DEFAULT_PAGINATION_OPTIONS.pageNumber * DEFAULT_PAGINATION_OPTIONS.pageSize,
			limit: DEFAULT_PAGINATION_OPTIONS.pageSize,
		};
	}

	private mapSearchOptionsToDto(model: AnimeManageParams.Search): AnimeManageParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
	}

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
			...this.mapPaginationOptionsToDto(model),
			...this.mapSearchOptionsToDto(model),
			...this.mapOrderingOptionToDto(model),
			...this.mapTypeOptionToDto(model),
		};
	}
}
