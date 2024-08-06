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

/** Sort options. */
export type SortOptions<T extends number | string> = {

	/** Direction. */
	readonly direction: SortDirection | null;

	/** Field sort by. */
	readonly field: T | null;
};
