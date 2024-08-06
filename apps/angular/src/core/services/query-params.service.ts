/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_PAGINATION_OPTIONS } from '@js-camp/core/constants/pagination';

/** Query params service. */
@Injectable({
	providedIn: 'root',
})
export class QueryParamsService {

	public constructor(
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) { }

	/**
	 * Remove undefined fields.
	 * @param obj Object to remove.
	 */
	private removeUndefinedFields<T extends Record<string, unknown>>(obj: T): Partial<T> {
		return Object.fromEntries(
			Object.entries(obj).filter(([_, value]) => value !== undefined),
		) as Partial<T>;
	}

	/**
	 * Obtain value from provided key.
	 * @param key Key of the query param.
	 */
	public obtain(key: string): string | null {
		const value = this.activatedRoute.snapshot.queryParamMap.get(key);
		if (value == null) {
			return null;
		}
		return value;
	}

	/**
	 * Append provide query params to the URL.
	 * @param params Params to append.
	 */
	public append(params: Record<string, any>): void {
		const paramsWithoutUndefinedField = this.removeUndefinedFields(params);
		Object.keys(paramsWithoutUndefinedField).forEach(key => {
			// Remove empty search or none type.
			if (paramsWithoutUndefinedField[key] === '' || paramsWithoutUndefinedField[key] === 'ALL') {
				paramsWithoutUndefinedField[key] = null;
			}
		});

		this.router.navigate([],
			{
				queryParams: paramsWithoutUndefinedField,
				relativeTo: this.activatedRoute,
				queryParamsHandling: 'merge',

			});
	}

	/**
	 * Remove specific param from the query.
	 * @param param Param to remove.
	 */
	public remove(param: string): void {
		const hasParam = this.activatedRoute
			.snapshot
			.queryParamMap
			.get(param) != null;

		if (hasParam) {
			this.router.navigate([], {
				queryParams: {
					[param]: null,
				},
				relativeTo: this.activatedRoute,
				queryParamsHandling: 'merge',
			});
		}
	}

	/** Reset all query params. */
	public reset(): void {
		this.router.navigate([], {
			queryParams: null,
			relativeTo: this.activatedRoute,
		});
	}

	/**
	 * Append provide query params and reset page number params to the URL.
	 * @param params Params to append.
	 */
	public appendParamsAndResetPageNumber(params: Record<string, any>): void {
		return this.append({ ...params, pageNumber: DEFAULT_PAGINATION_OPTIONS.pageNumber });
	}
}
