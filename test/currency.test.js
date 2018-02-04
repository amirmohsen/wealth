import {Currency} from '../lib/wealth.esm';

describe('The "Currency" class: ', () => {
	test('(new Currency("USD")).toString() === "USD"', () => {
		expect((new Currency('USD')).toString()).toBe('USD');
	});

	test('(new Currency("GBP")).getDecimalDigits() === 2', () => {
		expect((new Currency('GBP')).getDecimalDigits()).toBe(2);
	});

	test('(new Currency("EUR")).getSymbol() === "€"', () => {
		expect((new Currency('EUR')).getSymbol()).toBe('€');
	});

	test('(new Currency("GBP")).is(new Currency("USD")) === false', () => {
		expect((new Currency('GBP')).is(new Currency('USD'))).toBe(false);
	});
});
