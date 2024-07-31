import { AnimeStatusDto } from '../dtos/anime-status.dto';

import { AnimeStatus } from '../models/anime-status';

/** Record for mapping AnimeStatus to AnimeStatusDto. */
export const statusMappingToDto: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
	[AnimeStatus.Airing]: AnimeStatusDto.Airing,
	[AnimeStatus.Finished]: AnimeStatusDto.Finished,
	[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
};
