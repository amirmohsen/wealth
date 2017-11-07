import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import pkg from './package.json';

let presets = pkg.babel.presets;

presets[0].push({
	modules: false
});

const babelConfig = {
	presets,
	plugins: [
		'external-helpers',
		...pkg.babel.plugins
	],
	exclude: [
		'node_modules/**'
	],
	babelrc: false
};

export default [
	{
		input: 'src/index.js',
		output: {
			file: pkg.browser,
			format: 'umd'
		},
		name: 'Wealth',
		plugins: [
			json({
				preferConst: true
			}),
			resolve(),
			babel(babelConfig),
			commonjs()
		]
	},
	{
		input: 'src/index.js',
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
			babel(babelConfig)
		]
	}
];