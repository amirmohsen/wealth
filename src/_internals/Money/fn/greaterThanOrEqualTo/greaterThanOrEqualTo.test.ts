import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import greaterThanOrEqualTo from '.';

jest.mock('../../../CurrencyStore/internals/getData', () => () => ({
  USD,
  JPY,
  OMR,
}));

describe('greaterThanOrEqualTo', () => {

  test(
    'should return false when the first Money value is less than the second one',
    () => {
      const moneyA = new Money('100.00', 'USD');
      const moneyB = new Money('500.00', 'USD');

      expect(greaterThanOrEqualTo(moneyA, moneyB)).toBe(false);
    },
  );

  test(
    'should return true when the first Money value is equal to the second one',
    () => {
      const moneyA = new Money('100.00', 'USD');
      const moneyB = new Money('100.00', 'USD');

      expect(greaterThanOrEqualTo(moneyA, moneyB)).toBe(true);
    },
  );

  test(
    'should return true when the first Money value is greater than the second one',
    () => {
      const moneyA = new Money('500.00', 'USD');
      const moneyB = new Money('100.00', 'USD');

      expect(greaterThanOrEqualTo(moneyA, moneyB)).toBe(true);
    },
  );
});
