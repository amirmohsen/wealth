import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import getData, { CurrencySettingsInternalStore } from '../../../CurrencyStore/internals/getData';
import absolute from '.';

jest.mock('../../../CurrencyStore/internals/getData');

describe('absolute', () => {
  test('should return the absolute value of a Money value', () => {
    (getData as jest.MockedFunction<() => CurrencySettingsInternalStore>).mockReturnValue({
      USD,
      JPY,
      OMR,
    });
    const moneyA = new Money('-100.00', 'USD');

    expect(moneyA.toString()).toBe('-100.00');
    expect(absolute(moneyA).toString()).toBe('100.00');
  });
});
