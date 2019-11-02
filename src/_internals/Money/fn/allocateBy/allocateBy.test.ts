import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import getData from '../../../CurrencyStore/internals/getData';
import allocateBy from '.';

jest.mock('../../../CurrencyStore/internals/getData');

describe('allocateBy', () => {
  beforeAll(() => {
    getData.mockReturnValue({
      USD,
      JPY,
      OMR,
    });
  });

  test('should allocate based on a given number of shares', () => {
    const money = new Money('483.41', 'USD');

    expect(allocateBy(money, 3)
      .map(allocation => allocation.toString())).toEqual(['161.14', '161.14', '161.13']);
  });
});
