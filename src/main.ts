import { convert } from './binary_translator';
import {
	headerTitle,
	next,
	result,
	setHeaderTitle,
	setResult
} from './lib';

let score = 0;
let expected = next(score);

const setWrong = (v = false) => {
	if (v) {
		setHeaderTitle(headerTitle('Wrong!', true));
	} else {
		setHeaderTitle(headerTitle(score));
	}
};

const reset = (setScore: boolean = true) => {
	buttons.forEach((b) => (b.innerHTML = '0'));
	setResult(result(0));

	if (setScore) {
		score = 0;
	}
};

const buttons = new Array(8)
	.fill(0)
	.map((_, i) => `bit_${i + 1}`) // Generate `bit_1`, `bit_2`, ..., `bit_8`
	.map((id) => document.getElementById(id)!);

const update = () => {
	const fullVal = buttons.map((b) => b.innerHTML).join('');
	const guess = convert(fullVal);

	setResult(result(guess));

	return '';
};

const check = () => {
	const fullVal = buttons.map((b) => b.innerHTML).join('');
	const guess = convert(fullVal);

	console.log(guess, expected);
	if (guess === expected) {
		score++;
		expected = next(score);
		reset(false);
	} else {
		score = 0;
		reset();
		expected = next(score);
		setWrong(true);
		setTimeout(setWrong, 1000);
	}
};

buttons.forEach((elem) => {
	elem.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();

		elem.innerHTML = elem.innerHTML === '0' ? '1' : '0';
		update();
	});
});

document
	.getElementById('SUBMIT')!
	.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();

		check();
	});
