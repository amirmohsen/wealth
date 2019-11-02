import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import getData, { CurrencySettingsInternalStore } from '../../../CurrencyStore/internals/getData';
import greaterThan from '.';

jest.mock('../../../CurrencyStore/internals/getData');

describe('greaterThan', () => {
  beforeAll(() => {
    (getData as jest.MockedFunction<() => CurrencySettingsInternalStore>).mockReturnValue({
      USD,
      JPY,
      OMR,
    });
  });

  test('should return false when the first Money value is less than the second one', () => {
    const moneyA = new Money('100.00', 'USD');
    const moneyB = new Money('500.00', 'USD');

    expect(greaterThan(moneyA, moneyB)).toBe(false);
  });

  test('should return false when the first Money value is equal to the second one', () => {
    const moneyA = new Money('100.00', 'USD');
    const moneyB = new Money('100.00', 'USD');

    expect(greaterThan(moneyA, moneyB)).toBe(false);
  });

  test('should return true when the first Money value is greater than the second one', () => {
    const moneyA = new Money('500.00', 'USD');
    const moneyB = new Money('100.00', 'USD');

    expect(greaterThan(moneyA, moneyB)).toBe(true);
  });
});
