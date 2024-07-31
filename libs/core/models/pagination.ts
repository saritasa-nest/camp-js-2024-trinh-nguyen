
/** T type information of each fetch. */
export class Pagination<T> {

	/** Item array of each Page. */
	public readonly items: readonly T[];

	/** Total number of items in all of them. */
	public readonly totalCount: number;

	/** Whether has next page or not. */
	public readonly hasNext: boolean;

	/** Whether has previous page or not. */
	public readonly hasPrev: boolean;

	public constructor(data: PaginationConstructorData<T>) {
		this.items = data.items;
		this.totalCount = data.totalCount;
		this.hasNext = data.hasNext;
		this.hasPrev = data.hasPrev;
	}

	/** Check each page has item not not. */
	public get hasItems(): boolean {
		return this.items.length > 0;
	}
}

/** Pagination type: Make data flow more clear.  */
export type PaginationConstructorData<T> = {

	/** Item array of current fetch. */
	readonly items: readonly T[];

	/** Total number of items in all of them of current fetch. */
	readonly totalCount: number;

	/** Whether has next page or not of current fetch. */
	readonly hasNext: boolean;

	/** Whether has previous page or not of current fetch. */
	readonly hasPrev: boolean;
};
