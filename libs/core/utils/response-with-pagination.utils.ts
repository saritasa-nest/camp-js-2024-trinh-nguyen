
/** Pagination type: Make data flow transfer more clear.  */
export type ResponseWithPaginationDto<T> = {

	/** Total number of items in all of them. */
	readonly count: number;

	/** Next page Url, if not the value is null. */
	readonly next: string | null;

	/** Previous page Url, if not the value is null. */
	readonly previous: string | null;

	/** Item array of the current Page. */
	readonly results: T[];

};
