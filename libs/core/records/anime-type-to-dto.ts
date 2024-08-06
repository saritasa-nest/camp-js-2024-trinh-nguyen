import { AnimeTypeDto, AnimeTypeUrlDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';

/** Map anime type to dto. */
export const MAP_ANIME_TYPE_TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
	[AnimeType.TV]: AnimeTypeDto.TV,
	[AnimeType.OVA]: AnimeTypeDto.OVA,
	[AnimeType.Movie]: AnimeTypeDto.Movie,
	[AnimeType.Special]: AnimeTypeDto.Special,
	[AnimeType.ONA]: AnimeTypeDto.ONA,
	[AnimeType.Music]: AnimeTypeDto.Music,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
	[AnimeType.All]: AnimeTypeDto.ALL,
};

/** Map anime type to dto. */
export const MAP_ANIME_TYPE_TO_URL_DTO: Readonly<Record<AnimeType, AnimeTypeUrlDto>> = {
	[AnimeType.TV]: AnimeTypeUrlDto.TV,
	[AnimeType.OVA]: AnimeTypeUrlDto.OVA,
	[AnimeType.Movie]: AnimeTypeUrlDto.Movie,
	[AnimeType.Special]: AnimeTypeUrlDto.Special,
	[AnimeType.ONA]: AnimeTypeUrlDto.ONA,
	[AnimeType.Music]: AnimeTypeUrlDto.Music,
	[AnimeType.Unknown]: AnimeTypeUrlDto.Unknown,
	[AnimeType.PromotionalVideos]: AnimeTypeUrlDto.PromotionalVideos,
	[AnimeType.All]: AnimeTypeUrlDto.ALL,
};
