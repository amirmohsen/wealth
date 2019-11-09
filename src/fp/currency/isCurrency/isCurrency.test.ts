import { currencySymbol } from 'src/fp/symbols';
import { FrozenBaseCurrency } from 'src/fp/types';
import currency from 'src/fp/currency/currency';
import isCurrency from '.';

describe('isCurrency', () => {
  describe.each([
    [false],
    [true],
    [null],
    [undefined],
    [{}],
    [[]],
    [''],
    ['test'],
    [{ $$typeof: Symbol('random') }],
  ] as any[][])("when provided with any value that doesn't have the correct $$typeof property", (value: any) => {
    test('should return false', () => {
      expect(isCurrency(value)).toBe(false);
    });
  });

  describe.each([
    [
      {
        $$typeof: currencySymbol,
      } as FrozenBaseCurrency,
    ],
    [currency('USD')],
    [currency('GBP')],
  ])('when provided with a value that does have the correct $$typeof property', value => {
    test('should return true', () => {
      expect(isCurrency(value)).toBe(true);
    });
  });
});
