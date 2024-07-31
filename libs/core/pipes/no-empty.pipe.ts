import { Pipe, PipeTransform } from '@angular/core';

const NULL_VALUE = '-';

/** A custom pipe to transform an empty string to a default value. */
@Pipe({
	name: 'TransferEmpty',
	standalone: true,
})
export class NoEmptyPipe implements PipeTransform {
	/**
	 * Transform an empty value to a given default value.
	 * @param value The given value.
	 * @returns Return the given value or a default value if the value is empty.
	 */
	public transform(value: string | number | null): string | number {
		// Check value is not null.
		const isNotNull = value != null;

		// Check value is string not null.
		const isNonEmptyString = typeof value === 'string' && value !== '';

		// Check value is valid.
		const isValidNumber = typeof value === 'number' && !isNaN(value);

		return isNotNull && (isNonEmptyString || isValidNumber) ? value : NULL_VALUE;
	}
}
