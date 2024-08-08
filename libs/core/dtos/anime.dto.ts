
import { DateTimeRange } from '../models/datetime-range';

import { AnimeStatusDto } from './anime-status.dto';

import { AnimeTypeDto } from './anime-type.dto';

/** Anime DTO. */
export type AnimeDto = {

	/** ID. */
	readonly id: number;

	/** Created date. */
	readonly created: string;

	/** Modified date. */
	readonly modified: string;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Image URL. */
	readonly image: string;

	// TODO (Trinh Nguyen): Create DateRangeDto
	/** Aired duration. */
	readonly aired: DateTimeRange;

	/** Type. */
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Score. */
	readonly score: number;

	/** User score. */
	readonly user_score: number;

	/** Studio IDs. */
	readonly studioIds: readonly number[];

	/** Genre IDs. */
	readonly genreIds: readonly number[];

};
