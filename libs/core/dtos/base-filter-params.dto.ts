
/** Base filter params dto. */
export namespace BaseFilterParamsDto {
	export type Search = {

		/** Search item. */
		readonly search?: string;
	};
	export type Pagination = {

		/** Offset per page. */
		readonly offset?: number;

		/**  Limit item per page. */
		readonly limit?: number;
	};

	/** Combine search and pagination. */
	export type Combined = Search & Pagination;
}
