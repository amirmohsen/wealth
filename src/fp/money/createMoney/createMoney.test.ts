/* eslint-disable jest/no-identical-title */
import { createCurrency } from 'src/fp/currency';
import { InvalidInputError } from 'src/errors';
import { FrozenBaseCurrency, FrozenBaseMoney } from 'src/fp/types';
import BigNumber from 'bignumber.js';
import createMoney from '.';

describe('createMoney', () => {
  const doubleDigitCurrency = createCurrency('USD');
  const doubleDigitCurrencyWithDifferentFormatting = createCurrency('EUR', {
    thousandsSeparator: '.',
    decimalSeparator: ',',
  });
  const zeroDigitCurrency = createCurrency('JPY', { decimalDigits: 0 });

  describe.each([[false], [true], [null], [undefined], [34], [234.3454], [-23423], [{}], [[]]] as any[][])(
    'when given any non-string value',
    (value: any) => {
      test('should throw an error', () => {
        expect(() => createMoney(value, doubleDigitCurrency)).toThrow(
          new InvalidInputError(value, 'The input value is not a string.'),
        );
      });
    },
  );

  describe.each([[''], ['test'], ['123.45'], ['-34.5666778'], ['abc123']])(
    'when given a non-integer string value with a zero-decimal-digit currency',
    (value: string) => {
      test('should throw an error', () => {
        expect(() => createMoney(value, zeroDigitCurrency)).toThrow(
          new InvalidInputError(value, `The input value is not an integer to match the currency's 0 decimal digits.`),
        );
      });
    },
  );

  describe.each([[''], ['test'], ['123'], ['-345666778'], ['abc123'], ['34.3456'], ['346576.2', '34.0']])(
    "when given a non-decimal string value or a decimal value that doesnt't match the currency's decimal digit count",
    (value: string) => {
      test('should throw an error', () => {
        expect(() => createMoney(value, doubleDigitCurrency)).toThrow(
          new InvalidInputError(
            value,
            `The input value is not a fixed decimal number to match the currency's decimal digits.`,
            {
              decimalDigits: 2,
            },
          ),
        );
      });
    },
  );

  describe.each(([
    ['123334', zeroDigitCurrency],
    ['1234232.90', doubleDigitCurrency],
    ['34233.89', doubleDigitCurrencyWithDifferentFormatting],
  ] as unknown) as [string, FrozenBaseCurrency][])(
    'when provided with valid values',
    (value: string, cur: FrozenBaseCurrency) => {
      let moneyObj: FrozenBaseMoney;

      beforeAll(() => {
        moneyObj = createMoney(value, cur);
      });

      test('should create a Money object', () => {
        expect(moneyObj).toMatchSnapshot();
      });

      test('should use a BigNumber object as the value', () => {
        expect(BigNumber.isBigNumber(moneyObj.value)).toBe(true);
      });

      test('should create a frozen object', () => {
        expect(Object.isFrozen(moneyObj)).toBe(true);
      });
    },
  );
});
