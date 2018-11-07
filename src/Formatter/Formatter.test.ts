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

  test('Formatter.parse($54.42).amount == "54.42"', () => {
    expect(Formatter.parse('$54.42', 'USD').amount).toBe('54.42');
  });

  test('Formatter.parse(-$454.97).amount == "-454.97"', () => {
    expect(Formatter.parse('-$454.97', 'USD').amount).toBe('-454.97');
  });

  test('Formatter.parse($1,200,145,154.42).amount == "1200145154.42"', () => {
    expect(Formatter.parse('$1,200,145,154.42', 'USD')
    .amount).toBe('1200145154.42');
  });

  test('Formatter.parse(£454.97).amount == "454.97"', () => {
    expect(Formatter.parse('£454.97', 'GBP').amount).toBe('454.97');
  });

  test('Formatter.parse(454,97 €).amount == "454.97"', () => {
    expect(Formatter.parse('454,97 €', 'EUR').amount).toBe('454.97');
  });

  test('Formatter.parse(1 200 145 154,42 €).amount == "1200145154.42"', () => {
    expect(Formatter.parse('1 200 145 154,42 €', 'EUR')
    .amount).toBe('1200145154.42');
  });
});
