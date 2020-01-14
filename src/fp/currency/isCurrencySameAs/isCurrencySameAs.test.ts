/* eslint-disable jest/no-identical-title */
import { FrozenBaseCurrency, BaseCurrencyFormatter, BaseCurrencyParser } from 'src/fp/types';
import currency from 'src/fp/currency/createCurrency';
import isCurrencySameAs from '.';
import * as isCurrencyModule from '../isCurrency';

describe('isCurrencySameAs', () => {
  const fakeCurrency = Symbol('fakeCurrency');
  const USD = currency('USD');
  const USD_DUPLICATE = currency('USD');
  const USD_$ = currency('USD', {
    symbol: '$$',
    thousandsSeparator: '.',
    decimalSeparator: ',',
    pattern: '%v',
    toString: () => '$',
    toJSON: () => '$',
    formatter: ((() => null) as unknown) as BaseCurrencyFormatter,
    parser: ((() => null) as unknown) as BaseCurrencyParser,
  });
  const USD_10 = currency('USD', {
    decimalDigits: 10,
  });
  const GBP = currency('GBP');
  const JPY = currency('JPY', {
    decimalDigits: 0,
  });

  let isCurrency: jest.SpyInstance<boolean, [Readonly<FrozenBaseCurrency>]>;

  beforeAll(() => {
    isCurrency = jest.spyOn(isCurrencyModule, 'default');
  });

  beforeEach(() => {
    isCurrency.mockClear();
  });

  describe.each([[fakeCurrency, USD], [USD, fakeCurrency], [fakeCurrency, fakeCurrency]] as FrozenBaseCurrency[][])(
    'when either value is not a currency',
    (valueA, valueB) => {
      test('should return false', () => {
        expect(isCurrencySameAs(valueA, valueB)).toBe(false);
        if (valueA === ((fakeCurrency as unknown) as FrozenBaseCurrency)) {
          expect(isCurrency).toHaveBeenCalledTimes(1);
          expect(isCurrency).toHaveBeenCalledWith(valueA);
        } else {
          expect(isCurrency).toHaveBeenCalledTimes(2);
          expect(isCurrency).toHaveBeenNthCalledWith(1, valueA);
          expect(isCurrency).toHaveBeenNthCalledWith(2, valueB);
        }
      });
    },
  );

  describe.each([[USD, USD_10], [USD, GBP], [USD, JPY]])(
    'when the values are not equal',
    (valueA: FrozenBaseCurrency, valueB: FrozenBaseCurrency) => {
      test('should return false', () => {
        expect(isCurrencySameAs(valueA, valueB)).toBe(false);
      });
    },
  );

  describe('when the values are equal by reference', () => {
    test('should return true', () => {
      expect(isCurrencySameAs(USD, USD)).toBe(true);
    });
  });

  describe.each([[USD, USD_DUPLICATE], [USD, USD_$]])(
    'when the values are equal by decimal digits and code',
    (valueA: FrozenBaseCurrency, valueB: FrozenBaseCurrency) => {
      test('should return true', () => {
        expect(isCurrencySameAs(valueA, valueB)).toBe(true);
      });
    },
  );
});
