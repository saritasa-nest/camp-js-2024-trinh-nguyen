import { AnimeStatus } from '../enums/anime-status-enums';
import { AnimeTypeEnum } from '../enums/anime-type-enums';

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
	readonly titleEng: string;

	/** Japanese title. */
	readonly titleJpn: string;

	/** Image URL. */
	readonly image: string;

	/** Id. */
	readonly aired: TDateTimeRange;

	/** Type. */
	readonly type: AnimeTypeEnum;

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
