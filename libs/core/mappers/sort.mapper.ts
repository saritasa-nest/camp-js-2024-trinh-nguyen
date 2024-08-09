import { Injectable } from '@angular/core';

import { SortDirection, SortOptions } from '../models/sort-options';

/** Mapper for sort options. */
@Injectable({ providedIn: 'root' })
export class SortMapper {

	/**
	 * Mapper of sort to dto.
	 * @param data Sort options.
	 * @param fieldMap Mapping of fields to the ones that are backend-acceptable.
	 */
	public toDto<T extends number | string, U extends unknown>(
		data: SortOptions<T>,
		fieldMap: Record<T, U>,
	): string {
		const prefix = data.direction === SortDirection.Ascending ? '' : '-';
		if (data.field !== null) {
			return `${prefix}${fieldMap[data.field]}`;
		}
		return '';

	}
}
