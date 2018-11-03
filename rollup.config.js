import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
// import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
	{
		input: 'src/index.ts',
		output: {
			file: pkg.browser,
			format: 'umd',
			name: 'Wealth'
		},
		plugins: [
			json({
				preferConst: true
			}),
			resolve(),
			// babel(pkg.babel),
			typescript(),
			commonjs()
		]
	},
	{
		input: 'src/index.ts',
		external: [
			...Object.keys(pkg.dependencies),
			'validator/lib/isInt',
			'validator/lib/isFloat'
		],
		output: [
			{
				file: pkg.main,
				format: 'cjs'
			},
			{
				file: pkg.module,
				format: 'es'
			}
		],
		plugins: [
			json({
				preferConst: true
			}),
			typescript()
			// babel(pkg.babel)
		]
	}
];
