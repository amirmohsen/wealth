import os from 'os';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

export default [
	{
		input: 'src/umd.ts',
		output: {
			file: 'lib/umd.js',
			format: 'umd',
			name: 'Wealth',
			sourcemap: true,
		},
		plugins: [
			json({
				preferConst: true
			}),
			resolve(),
			typescript({
				typescript: require('typescript'),
				rollupCommonJSResolveHack: true,
				cacheRoot: `${os.tmpdir()}/.rpt2_cache`
			}),
			commonjs()
		]
	}
];
