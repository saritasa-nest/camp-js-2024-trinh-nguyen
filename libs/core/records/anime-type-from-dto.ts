import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';

/** Map anime type to dto. */
export const MAP_ANIME_TYPE_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
	[AnimeTypeDto.TV]: AnimeType.TV,
	[AnimeTypeDto.OVA]: AnimeType.OVA,
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.ONA]: AnimeType.ONA,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
	[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
};
