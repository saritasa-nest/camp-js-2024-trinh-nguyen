
import { AnimeStatus } from './anime-status';

import { AnimeType } from './anime-type';

import { DateTimeRange } from './datetime-range';

/** Represents anime. */
export type Anime = {

	/** ID. */
	readonly id: number;

	/** Created date. */
	readonly createdDate: Date;

	/** Modified date. */
	readonly modifiedDate: Date;

	/** English title. */
	readonly titleEnglish: string;

	/** Japanese title. */
	readonly titleJapan: string;

	/** Image URL. */
	readonly imageUrl: string;

	/** Id. */
	readonly aired: DateTimeRange;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Score. */
	readonly score: number;

	/** User score. */
	readonly userScore: number;

	/** Studio IDs. */
	readonly studios: readonly number[];

	/** Genre IDs. */
	readonly genres: readonly number[];

};
