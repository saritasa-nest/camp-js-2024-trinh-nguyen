
import { inject, Injectable } from '@angular/core';

import { Anime } from '../models/anime';
import { AnimeDto } from '../dtos/anime.dto';
import { statusMappingFromDto } from '../records/status-from-dto';
import { statusMappingToDto } from '../records/status-to-dto';

import { MAP_ANIME_TYPE_TO_DTO } from '../records/anime-type-to-dto';

import { MAP_ANIME_TYPE_FROM_DTO } from '../records/anime-type-from-dto';

import { Mapper } from './mapper';
import { DateTimeMapper } from './datetime-range.mapper';

/** Anime mapper map Model to Dto and vice vera Dto to Model. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper implements Mapper<AnimeDto, Anime> {
	private readonly dateTimeMapper = inject(DateTimeMapper);

	/** @inheritdoc */
	public fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			createdDate: this.dateTimeMapper.fromDto(dto.created),
			modifiedDate: this.dateTimeMapper.fromDto(dto.created),
			titleEnglish: dto.title_eng,
			titleJapan: dto.title_jpn,
			imageUrl: dto.image,
			aired: {
				start: dto.aired.start ? this.dateTimeMapper.fromDto(dto.aired.start) : null,
				end: dto.aired.end ? this.dateTimeMapper.fromDto(dto.aired.end) : null,
			},
			type: MAP_ANIME_TYPE_FROM_DTO[dto.type],
			status: statusMappingFromDto[dto.status],
			score: dto.score,
			userScore: dto.user_score,
			studioIds: dto.studioIds,
			genreIds: dto.genreIds,
		};
	}

	/** @inheritdoc */
	public toDto(data: Anime): AnimeDto {
		return {
			id: data.id,
			created: this.dateTimeMapper.toDto(data.createdDate),
			modified: this.dateTimeMapper.toDto(data.modifiedDate),
			title_eng: data.titleEnglish,
			title_jpn: data.titleJapan,
			image: data.imageUrl,
			aired: {
				start: data.aired.start ? this.dateTimeMapper.toDto(data.aired.start) : null,
				end: data.aired.end ? this.dateTimeMapper.toDto(data.aired.end) : null,
			},
			type: MAP_ANIME_TYPE_TO_DTO[data.type],
			status: statusMappingToDto[data.status],
			score: data.score,
			user_score: data.userScore,
			studioIds: data.studioIds,
			genreIds: data.genreIds,
		};
	}
}
