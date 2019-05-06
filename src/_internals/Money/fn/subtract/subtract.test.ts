import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import subtract from '.';

jest.mock('../../../CurrencyStore/internals/getData', () => () => ({
  USD,
  JPY,
  OMR,
}));

describe('subtract', () => {

  describe('with "USD" that has 2 decimal digits', () => {

    test('should subtract two Money values', () => {
      const moneyA = new Money('840.00', 'USD');
      const moneyB = new Money('78.62', 'USD');

      expect(subtract(moneyA, moneyB).toString()).toBe('761.38');
    });
  });

  describe('with "OMR" that has 3 decimal digits', () => {

    test('should subtract two Money values', () => {
      const moneyA = new Money('840.001', 'OMR');
      const moneyB = new Money('78.672', 'OMR');

      expect(subtract(moneyA, moneyB).toString()).toBe('761.329');
    });
  });

  describe('with "JPY" that has no decimal digits', () => {

    test('should subtract two Money values', () => {
      const moneyA = new Money('840', 'JPY');
      const moneyB = new Money('78', 'JPY');

      expect(subtract(moneyA, moneyB).toString()).toBe('762');
    });
  });
});
