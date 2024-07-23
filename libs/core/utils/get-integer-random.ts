/**
 * Random an integer number from 0 to max number.
 * @param max The maximum number to random from 0.
 */
export function getRandomIntegerNumber(max: number): number {
	if (max <= 0) {
		throw new Error('max value must be a positive integer');
	}

	const { crypto } = window;
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);

	return 1 + Math.floor(array[0] % max);
}
