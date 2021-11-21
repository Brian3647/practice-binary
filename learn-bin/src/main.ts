import { convert } from './binary_translator';
import { next, result, setResult } from './lib';

let score = 0;
let expected = next(score);

const reset = (setScore: boolean = true) => {
	buttons.forEach((b) => (b.innerHTML = '0'));
	setResult(result(0));

	if (setScore) {
		score = 0;
	}
};

const buttons = new Array(8)
	.fill(0)
	.map((_, i) => `bit_${i + 1}`)
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
		alert('Wrong!');
		score = 0;
		reset();
		expected = next(score);
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

document.getElementById('SUBMIT')!.addEventListener('click', (e) => {
	e.preventDefault();
	e.stopPropagation();

	check();
});
