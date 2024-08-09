import { BaseFilterParamsDto } from './base-filter-params.dto';

/** Anime params. */
export type AnimeManageParamsDto = {

	readonly ordering?: string;

	readonly type?: string;

} & BaseFilterParamsDto.Combined;
