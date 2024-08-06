import { AnimeSortFields } from './anime-sort-fields';

/** Sort direction. */
export enum SortDirection {
	Ascending = 'asc',
	Descending = 'desc',
}

/**
 * Get sort direction function.
 * @param direction Direction parameter.
 */
export function getSortDirection(direction: string): SortDirection | null {
	if (direction === SortDirection.Ascending) {
		return SortDirection.Ascending;
	} else if (direction === SortDirection.Descending) {
		return SortDirection.Descending;
	}

	return null;

}

/**
 * Get anime field from UI.
 * @param field Field.
 */
export function getAnimeSortField(field: string): AnimeSortFields | null {
	if (field === AnimeSortFields.Aired) {
		return AnimeSortFields.Aired;
	} else if (field === AnimeSortFields.Status) {
		return AnimeSortFields.Status;
	} else if (field === AnimeSortFields.TitleEnglish) {
		return AnimeSortFields.TitleEnglish;
	}

	return null;
}

/** Sort options. */
export type SortOptions<T extends number | string> = {

	/** Direction. */
	readonly direction: SortDirection | null;

	/** Field sort by. */
	readonly field: T | null;
};
