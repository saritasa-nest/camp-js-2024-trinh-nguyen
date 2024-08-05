
/** Anime params. */
export namespace AnimeManageParamsDto {
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
	export type Sort = {

		readonly ordering?: string;

	};
	export type Type = {

		/** TODO. */
		readonly type?: string;
	};

	/** Anime query params. */
	export type Combined = Search & Pagination & Sort & Type;
}
