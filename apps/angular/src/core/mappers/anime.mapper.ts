/* eslint-disable jsdoc/require-jsdoc */

import { IMapper } from '@js-camp/core/mappers/imapper';

import { TAnime } from '../models/anime';
import { TAnimeDto } from '../dtos/anime.dto';
import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';
import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';

/** Type of mapper from AnimeDto to Anime Model and vice vera mapper from Anime Model to AnimeDto. */
export type AnimeMapper = IMapper<TAnimeDto, TAnime>;

/** Map AnimeStatusDto to AnimeStatus. */
const statusMapping: Record<AnimeStatusDto, AnimeStatus> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

/** Record for mapping AnimeStatus to AnimeStatusDto. */
const statusMappingToDto: Record<AnimeStatus, AnimeStatusDto> = {
	[AnimeStatus.Airing]: AnimeStatusDto.Airing,
	[AnimeStatus.Finished]: AnimeStatusDto.Finished,
	[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
};

/** Record for mapping AnimeTypeDto to AnimeType. */
const typeMapping: Record<AnimeTypeDto, AnimeType> = {
	[AnimeTypeDto.TV]: AnimeType.TV,
	[AnimeTypeDto.OVA]: AnimeType.OVA,
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.ONA]: AnimeType.ONA,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.promotionalVideos]: AnimeType.promotionalVideos,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
};

/** Record for mapping AnimeType to AnimeTypeDto. */
const typeMappingToDto: Record<AnimeType, AnimeTypeDto> = {
	[AnimeType.TV]: AnimeTypeDto.TV,
	[AnimeType.OVA]: AnimeTypeDto.OVA,
	[AnimeType.Movie]: AnimeTypeDto.Movie,
	[AnimeType.Special]: AnimeTypeDto.Special,
	[AnimeType.ONA]: AnimeTypeDto.ONA,
	[AnimeType.Music]: AnimeTypeDto.Music,
	[AnimeType.promotionalVideos]: AnimeTypeDto.promotionalVideos,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
};

/** Implement mapper from AnimeDto to Anime Model and vice vera mapper from Anime Model to AnimeDto. */
export const animeMapper: AnimeMapper = {
	fromDto(dto: TAnimeDto) {
		return {
			id: dto.id,
			createdDate: new Date(dto.created),
			modifiedDate: new Date(dto.modified),
			titleEnglish: dto.title_eng,
			titleJapan: dto.title_jpn,
			imageUrl: dto.image,
			aired: dto.aired,
			type: typeMapping[dto.type],
			status: statusMapping[dto.status],
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		};
	},
	toDto(model: TAnime) {
		return {
			id: model.id,
			created: model.createdDate.toString(),
			modified: model.modifiedDate.toString(),
			title_eng: model.titleEnglish,
			title_jpn: model.titleJapan,
			image: model.imageUrl,
			aired: model.aired,
			type: typeMappingToDto[model.type],
			status: statusMappingToDto[model.status],
			score: model.score,
			user_score: model.userScore,
			studios: model.studios,
			genres: model.genres,
		};
	},
};
