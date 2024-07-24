
import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';
import { DateTimeRange } from './datetime-range';

/** Represents anime. */
export class Anime {

	/** ID. */
	public readonly id: number;

	/** Created date. */
	public readonly createdDate: Date;

	/** Modified date. */
	public readonly modifiedDate: Date;

	/** English title. */
	public readonly titleEnglish: string;

	/** Japanese title. */
	public readonly titleJapan: string;

	/** Image URL. */
	public readonly imageUrl: string;

	/** Id. */
	public readonly aired: DateTimeRange;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

	/** Score. */
	public readonly score: number;

	/** User score. */
	public readonly userScore: number;

	/** List of studios. */
	public readonly studios: readonly number[];

	/** List of genres. */
	public readonly genres: readonly number[];

	public constructor(
		data: Anime,
	) {
		this.id = data.id;
		this.createdDate = data.createdDate;
		this.modifiedDate = data.modifiedDate;
		this.titleEnglish = data.titleEnglish;
		this.titleJapan = data.titleJapan;
		this.imageUrl = data.imageUrl;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
		this.studios = data.studios;
		this.genres = data.genres;
	}
}
