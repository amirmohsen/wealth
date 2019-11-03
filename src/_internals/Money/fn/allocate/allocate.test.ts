import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import getData, { CurrencySettingsInternalStore } from '../../../CurrencyStore/internals/getData';
import allocate from '.';

jest.mock('../../../CurrencyStore/internals/getData');

describe('allocate', () => {
  beforeAll(() => {
    (getData as jest.MockedFunction<() => CurrencySettingsInternalStore>).mockReturnValue({
      USD,
      JPY,
      OMR,
    });
  });

  test('should allocate based on an array of ratios', () => {
    const money = new Money('89.67', 'USD');

    expect(allocate(money, [70, 24, 6]).map(allocation => allocation.toString())).toEqual(['62.77', '21.52', '5.38']);
  });
});
