
/**
 * Check value is not null.
 * @param value Element need checking.
 */
export function isNotNull<T>(value: T): value is NonNullable<T> {
	return value !== null && value !== undefined;
}
