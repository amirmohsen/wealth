import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
	{
		input: 'index.ts',
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
			typescript({
				typescript: require('typescript'),
				rollupCommonJSResolveHack: true
			}),
			commonjs()
		]
	},
	{
		input: 'index.ts',
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
			typescript({
				typescript: require('typescript')
			})
		]
	}
];
