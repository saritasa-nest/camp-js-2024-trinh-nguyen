import { SortOptions } from '../models/sort-options';

import { AnimeSortFields } from './anime-sort-fields';

import { AnimeType } from './anime-type';

/** Anime params. */
export namespace AnimeManageParams {

	/** Search param. */
	export type Search = {

		/** Search item. */
		readonly search: string | null;
	};

	/** Pagination param. */
	export type Pagination = {

		/** Page number. */
		readonly pageNumber: number | null;

		/**  Page size. */
		readonly pageSize: number | null;
	};

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
	export type Combined = Search & Pagination & Sort & Type;
}
