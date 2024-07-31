import { AnimeTypeDto } from '../dtos/anime-type.dto';

import { AnimeType } from '../models/anime-type';

/** Record for mapping AnimeType to AnimeTypeDto. */
export const typeMappingToDto: Readonly<Record<AnimeType, AnimeTypeDto>> = {
	[AnimeType.TV]: AnimeTypeDto.TV,
	[AnimeType.OVA]: AnimeTypeDto.OVA,
	[AnimeType.Movie]: AnimeTypeDto.Movie,
	[AnimeType.Special]: AnimeTypeDto.Special,
	[AnimeType.ONA]: AnimeTypeDto.ONA,
	[AnimeType.Music]: AnimeTypeDto.Music,
	[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
};
