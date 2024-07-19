
import { IMapper } from '@js-camp/core/mappers/imapper';

import { TAnime } from '../models/anime';
import { TAnimeDto } from '../dtos/anime.dto';

// Mapper từ DTO Anime sang Model Anime
// eslint-disable-next-line jsdoc/require-jsdoc
export type AnimeMapper = IMapper<TAnimeDto, TAnime>;

// eslint-disable-next-line jsdoc/require-jsdoc
export const animeMapper: AnimeMapper = {
	fromDto(dto: TAnimeDto) {
		return {
			id: dto.id,
			createdDate: dto.created,
			modifiedDate: dto.modified,
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			image: dto.image,
			aired: dto.aired,
			type: dto.type,
			status: dto.status,
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		};
	},
	toDto(model: TAnime) {
		return {
			id: model.id,
			created: model.createdDate,
			modified: model.modifiedDate,
			title_eng: model.titleEng,
			title_jpn: model.titleJpn,
			image: model.image,
			aired: model.aired,
			type: model.type,
			status: model.status,
			score: model.score,
			user_score: model.userScore,
			studios: model.studios,
			genres: model.genres,
		};
	},
};
