
import { SortOptions } from '../models/sort-options';

import { AnimeSortFields } from './anime-sort-fields';
import { AnimeType } from './anime-type';

/** Anime params. */
export namespace AnimeManageParams {

	/** TODO. */
	export type Search = {

		/** Search item. */
		readonly search: string | null;
	};

	/** TODO. */
	export type Pagination = {

		/** Page number. */
		readonly pageNumber: number | null;

		/**  Page size. */
		readonly pageSize: number | null;
	};

	/** TODO. */
	export type Sort = {

		/** TODO. */
		readonly sortOptions: SortOptions<AnimeSortFields> | null;
	};

	/** TODO. */
	export type Type = {

		/** TODO. */
		readonly type: AnimeType | null;
	};

	/** Anime query params. */
	export type Combined = Search & Pagination & Sort & Type;
}
