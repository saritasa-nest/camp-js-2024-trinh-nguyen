import { AnimeSortFieldsDto } from '../dtos/anime-sort-fields.dto';
import { AnimeSortFields } from '../models/anime-sort-fields';

/** Anime sort field to dto. */
export const MAP_ANIME_SORT_FIELDS_FROM_DTO: Readonly<Record<AnimeSortFieldsDto, AnimeSortFields>> = {
	[AnimeSortFieldsDto.Aired]: AnimeSortFields.Aired,
	[AnimeSortFieldsDto.Status]: AnimeSortFields.Status,
	[AnimeSortFieldsDto.TitleEnglish]: AnimeSortFields.TitleEnglish,

};
