import {Currency} from '../dist/wealth.esm';

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
});