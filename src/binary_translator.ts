// Taken (and modified) from
// https://github.com/Brian3647/binary-number-translator/blob/main/lib/index.ts

/**
	Max result (generated from 11111111).
	Not actually used in `convert`, but may be useful 
*/
export const BYTE_SIZE = 255;

/**
 * Converts bytes into numbers.
 * @param {string} input Input string to convert.
 * @returns {number} The parsed number
 * @example
 * import convert from '...'
 *
 * console.log(convert('00000010')); // 2
 * console.log(convert('00000110')); // 6
 */
export const convert = (input: string): number => {
	let res = 0;

	const chars = input.split('').reverse();

	for (let i = 0; i < chars.length; i++) {
		const ch = chars[i];

		if (ch !== '0') {
			res += 2 ** i;
		}
	}

	return res;
};
