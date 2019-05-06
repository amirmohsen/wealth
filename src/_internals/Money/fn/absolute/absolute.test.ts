import { Money } from '../..';
import { USD, JPY, OMR } from '../../../constants/ISO_CURRENCIES';
import absolute from '.';

jest.mock('../../../CurrencyStore/internals/getData', () => () => ({
  USD,
  JPY,
  OMR,
}));

describe('absolute', () => {

  test('should return the absolute value of a Money value', () => {
    const moneyA = new Money('-100.00', 'USD');

    expect(moneyA.toString()).toBe('-100.00');
    expect(absolute(moneyA).toString()).toBe('100.00');
  });
});
