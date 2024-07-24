
import { DateTimeRange } from '../models/datetime-range';

import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';

/** Anime DTO. */
export class AnimeDto {

	/** ID. */
	public readonly id: number;

	/** Created date. */
	public readonly created: string;

	/** Modified date. */
	public readonly modified: string;

	/** English title. */
	public readonly title_eng: string;

	/** Japanese title. */
	public readonly title_jpn: string;

	/** Image URL. */
	public readonly image: string;

	/** Aired duration. */
	public readonly aired: DateTimeRange;

	/** Type. */
	public readonly type: AnimeTypeDto;

	/** Status. */
	public readonly status: AnimeStatusDto;

	/** Score. */
	public readonly score: number;

	/** User score. */
	public readonly user_score: number;

	/** List of studios. */
	public readonly studios: readonly number[];

	/** List of genres. */
	public readonly genres: readonly number[];

	public constructor(
		data: AnimeDto,
	) {
		this.id = data.id;
		this.created = data.created;
		this.modified = data.modified;
		this.title_eng = data.title_eng;
		this.title_jpn = data.title_jpn;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.user_score = data.user_score;
		this.studios = data.studios;
		this.genres = data.genres;
	}
}
