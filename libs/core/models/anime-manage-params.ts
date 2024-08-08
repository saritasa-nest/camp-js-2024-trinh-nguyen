import { SortOptions } from '../models/sort-options';

import { AnimeSortFields } from './anime-sort-fields';

import { AnimeType } from './anime-type';
import { BaseFilterParams } from './base-filter-params';

/** Anime params. */
export type AnimeManageParams = {

	/** Sort options. */
	readonly sortOptions: SortOptions<AnimeSortFields> | null;

	/** Anime type. */
	readonly type: AnimeType | null;

} & BaseFilterParams.Combined;
