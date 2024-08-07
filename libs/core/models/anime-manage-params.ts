import { SortOptions } from '../models/sort-options';

import { AnimeSortFields } from './anime-sort-fields';

import { AnimeType } from './anime-type';
import { BaseFilterParams } from './base-filter-params';

/** Anime params. */
export namespace AnimeManageParams {

	/** Sort param. */
	export type Sort = {

		/** Sort options. */
		readonly sortOptions: SortOptions<AnimeSortFields> | null;
	};

	/** Type param. */
	export type Type = {

		/** Anime type. */
		readonly type: AnimeType | null;
	};

	/** Anime query params. */
	export type Combined = BaseFilterParams.Pagination & BaseFilterParams.Search & Sort & Type;
}
