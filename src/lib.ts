import { BYTE_SIZE } from './binary_translator';

export const headerDescription = <T>(e: T) =>
	`Expected: ${e}`;
export const headerTitle = <T>(s: T, noScore = false) =>
	`Learn binary - ${(!noScore && 'Score: ') || ''}${s}`;
export const result = <T>(x: T) => `=${x}`;

export const genNextExpected = (): number => {
	return Math.floor(Math.random() * BYTE_SIZE);
};

export const setHeaderDescription = (val: string) => {
	document.getElementById('HEADER_DESCRIPTION')!.innerHTML =
		val;
};

export const setResult = (val: string) => {
	document.getElementById('RESULT')!.innerHTML = val;
};

export const setHeaderTitle = (val: string) => {
	document.getElementById('HEADER_TITLE')!.innerHTML = val;
};

export const next = <T>(score: T) => {
	const expected = genNextExpected();
	setHeaderDescription(headerDescription(expected));
	setHeaderTitle(headerTitle(score));
	return expected;
};
