// Taken (and modified) from
// https://github.com/Brian3647/binary-number-translator/blob/main/lib/index.ts

/**
 * Converts bytes into numbers.
 * @param {string} input Input string to convert.
 * @returns {number | null} The parsed number or null if the input isn't correct
 * @example
 * import convert from '...'
 *
 * console.log(convert('00000010')); // 2
 * console.log(convert('00000110')); // 6
 */
export const convert = (input: string): number | null => {
	let res = 0;

	if (input.length !== 8) return null;

	const chars = input.split('').reverse();

	for (let i = 0; i < chars.length; i++) {
		const ch = chars[i];

		if (ch === '1') {
			res += 2 ** i;
		} else if (ch !== '0') {
			return null;
		}
	}

	return res;
};
