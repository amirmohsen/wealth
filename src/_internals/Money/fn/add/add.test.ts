import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import add from '.';

jest.mock('../../../CurrencyStore/internals/getData', () => () => ({
  USD,
  JPY,
  OMR,
}));

describe('add', () => {

  describe('with "USD" that has 2 decimal digits', () => {

    test('should add two Money values', () => {
      const moneyA = new Money('10.38', 'USD');
      const moneyB = new Money('8404.97', 'USD');

      expect(add(moneyA, moneyB).toString()).toBe('8415.35');
    });
  });

  describe('with "OMR" that has 3 decimal digits', () => {

    test('should add two Money values', () => {
      const moneyA = new Money('10.381', 'OMR');
      const moneyB = new Money('8404.977', 'OMR');

      expect(add(moneyA, moneyB).toString()).toBe('8415.358');
    });
  });

  describe('with "JPY" that has no decimal digits', () => {

    test('should add two Money values', () => {
      const moneyA = new Money('10', 'JPY');
      const moneyB = new Money('8404', 'JPY');

      expect(add(moneyA, moneyB).toString()).toBe('8414');
    });
  });
});
