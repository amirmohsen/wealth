import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import lessThanOrEqualTo from '.';

jest.mock('../../../CurrencyStore/internals/getData', () => () => ({
  USD,
  JPY,
  OMR,
}));

describe('lessThanOrEqualTo', () => {

  test(
    'should return true when the first Money value is less than the second one',
    () => {
      const moneyA = new Money('100.00', 'USD');
      const moneyB = new Money('500.00', 'USD');

      expect(lessThanOrEqualTo(moneyA, moneyB)).toBe(true);
    },
  );

  test(
    'should return true when the first Money value is equal to the second one',
    () => {
      const moneyA = new Money('100.00', 'USD');
      const moneyB = new Money('100.00', 'USD');

      expect(lessThanOrEqualTo(moneyA, moneyB)).toBe(true);
    },
  );

  test(
    'should return false when the first Money value is greater than the second one',
    () => {
      const moneyA = new Money('500.00', 'USD');
      const moneyB = new Money('100.00', 'USD');

      expect(lessThanOrEqualTo(moneyA, moneyB)).toBe(false);
    },
  );
});