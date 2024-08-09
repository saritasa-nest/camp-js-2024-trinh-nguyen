/** Base filter parameters. */
export namespace BaseFilterParams {

	/** Search filter. */
	export type Search = {

		/** Search filter. */
		readonly search: string | null;
	};

	/** Pagination filters. */
	export type Pagination = {

		/** Page number filter. */
		readonly pageNumber: number | null;

		/** Page size filter. */
		readonly pageSize: number | null;
	};

	/** Search and pagination filters. */
	export type Combined = Search & Pagination;
}
