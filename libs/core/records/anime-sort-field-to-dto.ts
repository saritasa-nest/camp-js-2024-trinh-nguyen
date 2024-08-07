import { AnimeSortFieldsDto, AnimeSortFieldsUrlDto } from '../dtos/anime-sort-fields.dto';
import { AnimeSortFields } from '../models/anime-sort-fields';

/** Anime sort field to dto. */
export const MAP_ANIME_SORT_FIELDS_TO_DTO: Readonly<Record<AnimeSortFields, AnimeSortFieldsDto>> = {
	[AnimeSortFields.Aired]: AnimeSortFieldsDto.Aired,
	[AnimeSortFields.Status]: AnimeSortFieldsDto.Status,
	[AnimeSortFields.TitleEnglish]: AnimeSortFieldsDto.TitleEnglish,

};

/** Anime sort field to url dto. */
export const MAP_ANIME_SORT_FIELDS_TO_URL_DTO: Readonly<Record<AnimeSortFields, AnimeSortFieldsUrlDto>> = {
	[AnimeSortFields.Aired]: AnimeSortFieldsUrlDto.Aired,
	[AnimeSortFields.Status]: AnimeSortFieldsUrlDto.Status,
	[AnimeSortFields.TitleEnglish]: AnimeSortFieldsUrlDto.TitleEnglish,

};
