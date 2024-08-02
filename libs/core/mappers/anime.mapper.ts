
import { Injectable } from '@angular/core';

import { Anime } from '../models/anime';
import { AnimeDto } from '../dtos/anime.dto';
import { typeMappingFromDto } from '../records/type-from-dto';
import { statusMappingFromDto } from '../records/status-from-dto';
import { typeMappingToDto } from '../records/type-to-dto';
import { statusMappingToDto } from '../records/status-to-dto';

import { Mapper } from './mapper';

/** Anime mapper map Model to Dto and vice vera Dto to Model. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper implements Mapper<AnimeDto, Anime> {

	/** @inheritdoc */
	public fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			createdDate: new Date(dto.created),
			modifiedDate: new Date(dto.modified),
			titleEnglish: dto.title_eng,
			titleJapan: dto.title_jpn,
			imageUrl: dto.image,
			aired: {
				start: dto.aired.start,
				end: dto.aired.end,
			},
			type: typeMappingFromDto[dto.type],
			status: statusMappingFromDto[dto.status],
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		};
	}

	/** @inheritdoc */
	public toDto(data: Anime): AnimeDto {
		return {
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
		};
	}
}
