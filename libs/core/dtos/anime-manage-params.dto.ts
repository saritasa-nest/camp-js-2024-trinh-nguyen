import { BaseFilterParamsDto } from './base-filter-params.dto';

/** Anime params. */
export namespace AnimeManageParamsDto {

	export type Sort = {

		readonly ordering?: string;

	};
	export type Type = {

		/** TODO. */
		readonly type?: string;
	};

	/** Anime query params. */
	export type Combined = BaseFilterParamsDto.Pagination & BaseFilterParamsDto.Search & Sort & Type;
}
