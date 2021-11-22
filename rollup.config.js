import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { spawn } from 'child_process';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: [
		{
			file: 'public/dist/index.js',
			format: 'iife'
		}
	],
	plugins: [
		typescript(),
		production && terser(),
		!production && serve(),
		!production && livereload('public')
	]
};
