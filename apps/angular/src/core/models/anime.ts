
import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';
import { TDateTimeRange } from './datetime-range';

/** Represents anime. */
export type TAnime = {

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
	readonly aired: TDateTimeRange;

	/** Type. */
	readonly type: AnimeType;

	/** Status. */
	readonly status: AnimeStatus;

	/** Score. */
	readonly score: number;

	/** User score. */
	readonly userScore: number;

	/** List of studios. */
	readonly studios: readonly number[];

	/** List of genres. */
	readonly genres: readonly number[];
};
