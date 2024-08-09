import { AnimeTypeDto, AnimeTypeUrlDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';

/** Map anime type from dto. */
export const MAP_ANIME_TYPE_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
	[AnimeTypeDto.TV]: AnimeType.TV,
	[AnimeTypeDto.OVA]: AnimeType.OVA,
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.ONA]: AnimeType.ONA,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
	[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeDto.ALL]: AnimeType.All,
};

/** Map anime type from url dto. */
export const MAP_ANIME_TYPE_FROM_URL_DTO: Readonly<Record<AnimeTypeUrlDto, AnimeType>> = {
	[AnimeTypeUrlDto.TV]: AnimeType.TV,
	[AnimeTypeUrlDto.OVA]: AnimeType.OVA,
	[AnimeTypeUrlDto.Movie]: AnimeType.Movie,
	[AnimeTypeUrlDto.Special]: AnimeType.Special,
	[AnimeTypeUrlDto.ONA]: AnimeType.ONA,
	[AnimeTypeUrlDto.Music]: AnimeType.Music,
	[AnimeTypeUrlDto.Unknown]: AnimeType.Unknown,
	[AnimeTypeUrlDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeUrlDto.ALL]: AnimeType.All,
};
