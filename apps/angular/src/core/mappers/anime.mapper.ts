import { IMapper } from '@js-camp/core/mappers/imapper';

import { Injectable } from '@angular/core';

import { Anime } from '../models/anime';
import { AnimeDto } from '../dtos/anime.dto';
import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';
import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';

/** Map AnimeStatusDto to AnimeStatus. */
const statusMappingFromDto: Record<AnimeStatusDto, AnimeStatus> = {
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
const typeMappingFromDto: Record<AnimeTypeDto, AnimeType> = {
	[AnimeTypeDto.TV]: AnimeType.TV,
	[AnimeTypeDto.OVA]: AnimeType.OVA,
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.ONA]: AnimeType.ONA,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
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
	[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
};

/** Anime mapper map Model to Dto and vice vera Dto to Model. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper implements IMapper<AnimeDto, Anime> {

	/**
	 * Map from dto data to model data.
	 * @param dto Data need mapping.
	 */
	public fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			createdDate: new Date(dto.created),
			modifiedDate: new Date(dto.modified),
			titleEnglish: dto.title_eng,
			titleJapan: dto.title_jpn,
			imageUrl: dto.image,
			aired: dto.aired,
			type: typeMappingFromDto[dto.type],
			status: statusMappingFromDto[dto.status],
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		});
	}

	/**
	 * Map from model data to model data.
	 * @param data Data need mapping.
	 */
	public toDto(data: Anime): AnimeDto {
		return new AnimeDto({
			id: data.id,
			created: data.createdDate.toString(),
			modified: data.modifiedDate.toString(),
			title_eng: data.titleEnglish,
			title_jpn: data.titleJapan,
			image: data.imageUrl,
			aired: data.aired,
			type: typeMappingToDto[data.type],
			status: statusMappingToDto[data.status],
			score: data.score,
			user_score: data.userScore,
			studios: data.studios,
			genres: data.genres,
		});
	}
}
