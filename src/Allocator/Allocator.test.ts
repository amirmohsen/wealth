import Money from '../Money';
import { USD } from '../constants/ISO_CURRENCIES';
import {
  allocate,
  allocateBy,
} from '.';

jest.mock('../CurrencyStore/internals/getData', () => () => ({
  USD,
}));

describe('Allocator', () => {

  test('"allocate" should allocate based on an array of ratios', () => {
    const money = new Money('89.67', 'USD');

    expect(allocate(money, [70, 24, 6])
      .map(allocation => allocation.toString())).toEqual(['62.77', '21.52', '5.38']);
  });

  test('2allocateBy" should allocate based on a given number of shares', () => {
    const money = new Money('483.41', 'USD');

    expect(allocateBy(money, 3)
      .map(allocation => allocation.toString())).toEqual(['161.14', '161.14', '161.13']);
  });
});
