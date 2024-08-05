
/** Anime params. */
export class AnimeParams {

	/** Default values for AnimeParams. */
	public static readonly defaultValues = {
		pageIndex: 0,
		pageSize: 15,
	};

	/** Current page index. */
	public readonly pageIndex: number;

	/** Number of elements that can be on a page. */
	public readonly pageSize: number;

	public constructor(data: Partial<AnimeParams> = {}) {
		this.pageIndex = data.pageIndex ?? AnimeParams.defaultValues.pageIndex;
		this.pageSize = data.pageSize ?? AnimeParams.defaultValues.pageSize;
	}
}
