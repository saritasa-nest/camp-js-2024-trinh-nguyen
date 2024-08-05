import { AnimeStatusDto } from '../dtos/anime-status.dto';

import { AnimeStatus } from '../models/anime-status';

/** Map AnimeStatusDto to AnimeStatus. */
export const statusMappingFromDto: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};
