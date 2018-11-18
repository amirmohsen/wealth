import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import multiply from '.';

jest.mock('../../../CurrencyStore/internals/getData', () => () => ({
  USD,
  JPY,
  OMR,
}));

describe('multiply', () => {

  describe('with "USD" that has 2 decimal digits', () => {

    test('should multiply a Money value by a number', () => {
      const	moneyA = new Money('5', 'USD');

      expect(multiply(moneyA, '4.05').toString()).toBe('0.20');
    });
  });

  describe('with "OMR" that has 3 decimal digits', () => {

    test('should multiply a Money value by a number', () => {
      const moneyA = new Money('1.705', 'OMR');

      expect(multiply(moneyA, '4.05').toString()).toBe('6.905');
    });
  });

  describe('with "JPY" that has no decimal digits', () => {

    test('should multiply a Money value by a number', () => {
      const moneyA = new Money('13', 'JPY');

      expect(multiply(moneyA, '4').toString()).toBe('52');
    });
  });
});
