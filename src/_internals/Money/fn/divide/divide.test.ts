import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import divide from '.';

jest.mock('../../../CurrencyStore/internals/getData', () => () => ({
  USD,
  JPY,
  OMR,
}));

describe('divide', () => {

  describe('with "USD" that has 2 decimal digits', () => {

    test('should divide a Money value by a number', () => {
      const moneyA = new Money('1096.37', 'USD');

      expect(divide(moneyA, '80.47').toString()).toBe('13.62');
    });
  });

  describe('with "OMR" that has 3 decimal digits', () => {

    test('should divide a Money value by a number', () => {
      const moneyA = new Money('1096.347', 'OMR');

      expect(divide(moneyA, '80').toString()).toBe('13.704');
    });
  });

  describe('with "JPY" that has no decimal digits', () => {

    test('should divide a Money value by a number', () => {
      const moneyA = new Money('1096', 'JPY');

      expect(divide(moneyA, '80').toString()).toBe('14');
    });
  });
});
