import { AnimeSortFields } from '../models/anime-sort-fields';
import { PaginationOptions } from '../models/pagination-options';
import { SortDirection, SortOptions } from '../models/sort-options';

/** Anime default sort options. */
export const ANIME_DEFAULT_SORT_OPTIONS: SortOptions<AnimeSortFields> = {
	direction: SortDirection.Ascending,
	field: AnimeSortFields.Status,
};

/** Default pagination options. */
export const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
	pageNumber: 0,
	pageSize: 10,
};
