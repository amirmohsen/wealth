import Formatter from './Formatter';
import Money from '../Money/Money';

describe('Formatter', () => {

	test('Formatter.format(new Money("500000, "USD")) == $5,000.00', () => {
		expect(Formatter.format(new Money('500000', 'USD'))).toBe('$5,000.00');
	});

	test('Formatter.format(new Money("500000, "EUR")) == 5 000,00 €', () => {
		expect(Formatter.format(new Money('500000', 'EUR'))).toBe('5 000,00 €');
	});

	test('Formatter.format(new Money("500000, "USD"), "GBP") == £5,000.00', () => {
		expect(Formatter.format(new Money('500000', 'USD'), 'GBP')).toBe('£5,000.00');
	});

	test('Formatter.parse($54.42).getAmountAsStringFloat() == "54.42"', () => {
		expect(Formatter.parse('$54.42', 'USD').getAmountAsStringFloat()).toBe('54.42');
	});

	test('Formatter.parse(-$454.97).getAmountAsStringFloat() == "-454.97"', () => {
		expect(Formatter.parse('-$454.97', 'USD').getAmountAsStringFloat()).toBe('-454.97');
	});

	test('Formatter.parse($1,200,145,154.42).getAmountAsStringFloat() == "1200145154.42"', () => {
		expect(Formatter.parse('$1,200,145,154.42', 'USD').getAmountAsStringFloat()).toBe('1200145154.42');
	});

	test('Formatter.parse(£454.97).getAmountAsStringFloat() == "454.97"', () => {
		expect(Formatter.parse('£454.97', 'GBP').getAmountAsStringFloat()).toBe('454.97');
	});

	test('Formatter.parse(454,97 €).getAmountAsStringFloat() == "454.97"', () => {
		expect(Formatter.parse('454,97 €', 'EUR').getAmountAsStringFloat()).toBe('454.97');
	});

	test('Formatter.parse(1 200 145 154,42 €).getAmountAsStringFloat() == "1200145154.42"', () => {
		expect(Formatter.parse('1 200 145 154,42 €', 'EUR').getAmountAsStringFloat()).toBe('1200145154.42');
	});
});
