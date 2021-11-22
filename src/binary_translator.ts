// Taken from https://github.com/Brian3647/binary-number-translator/blob/main/lib/index.ts

/**
 * Converts bytes into numbers.
 * @param {string} input Input string to convert.
 * @returns {number} The parsed number
 * @example
 * import convert from 'binary-number-translator'
 *
 * console.log(convert('00000010')); // 2
 * console.log(convert('00000110')); // 6
 */
export const convert = (input: string): number => {
	let res = 0;

	assert_eq(input.length, 8, 'Expected 1 byte length (8 characters)');

	const chars = input.split('').reverse();

	for (let i = 0; i < chars.length; i++) {
		const ch = chars[i];

		assert_eq_of(ch, ['0', '1'], 'Expected a bit character');

		if (ch === '1') {
			res += 2 ** i;
		}
	}

	return res;
};

const assert_eq = <L, R>(val: L, compare: R, msg?: string): void | never => {
	if ((val as unknown) !== compare) {
		const fmt = (msg && `\n- ${msg}`) || '';
		throw (
			'Error with binary-number-translator' +
			`Assertion failed: ${val} != ${compare}${fmt}`
		);
	}
};

const assert_eq_of = <T>(val: T, compare: T[], msg?: string): void | never => {
	if (!compare.includes(val)) {
		let fmt: string[] | string = [];

		compare.forEach((x) => (fmt as string[]).push(`${val} != ${x} && `));

		fmt = fmt.join('').substring(0, fmt.join('').length - 4);

		throw (
			'Error with binary-number-translator' +
			`Assertion failed: ${fmt}${(msg && `\n- ${msg}`) || ''}`
		);
	}
};
