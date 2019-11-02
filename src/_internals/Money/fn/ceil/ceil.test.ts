import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import getData from '../../../CurrencyStore/internals/getData';
import ceil from '.';

jest.mock('../../../CurrencyStore/internals/getData');

describe('ceil', () => {
  beforeAll(() => {
    getData.mockReturnValue({
      USD,
      JPY,
      OMR,
    });
  });

  test('should round up a Money value to the nearest integer value', () => {
    const moneyA = new Money('100.18', 'USD');

    expect(moneyA.toString()).toBe('100.18');
    expect(ceil(moneyA).toString()).toBe('101.00');
  });
});
