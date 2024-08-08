import { Injectable } from '@angular/core';

import { Mapper } from './mapper';

/** Date mapper service. */
@Injectable({
	providedIn: 'root',
})
export class DateTimeMapper implements Mapper<string, Date> {

	private parseDate(dateStr: string): Date | null {
		const date = new Date(dateStr);
		return isNaN(date.getTime()) ? null : date;
	}

	/**
	 * @inheritdoc
	 * Return either a valid date or an empty date.
	 */
	public fromDto(dto: string): Date {
		const date = new Date(dto);
		return date ?? new Date();
	}

	/** @inheritdoc */
	public toDto(model: Date): string {
		return model.toISOString();
	}
}
