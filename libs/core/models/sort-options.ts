/** Sort direction. */
export enum SortDirection {
	Ascending = 'asc',
	Descending = 'desc',
}

/** Sort options. */
export type SortOptions<T extends number | string> = {

	/** Direction. */
	readonly direction: SortDirection | null;

	/** Field sort by. */
	readonly field: T | null;
};
