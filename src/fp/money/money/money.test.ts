/* eslint-disable jest/no-identical-title */
import { currency } from 'src/fp/currency';
import { WrongInputError } from 'src/shared/errors';
import { FrozenBaseCurrency, FrozenBaseMoney } from 'src/fp/types';
import BigNumber from 'bignumber.js';
import money from '.';

describe('money', () => {
  const doubleDigitCurrency = currency('USD');
  const doubleDigitCurrencyWithDifferentFormatting = currency('EUR', {
    thousandsSeparator: '.',
    decimalSeparator: ',',
  });
  const zeroDigitCurrency = currency('JPY', { decimalDigits: 0 });

  describe.each([[false], [true], [null], [undefined], [34], [234.3454], [-23423], [{}], [[]]] as any[][])(
    'when given any non-string value',
    (value: any) => {
      test('should throw an error', () => {
        expect(() => money(value, doubleDigitCurrency)).toThrow(
          new WrongInputError(`The input value, "${value}", is not a string.`),
        );
      });
    },
  );

  describe.each([[''], ['test'], ['123.45'], ['-34.5666778'], ['abc123']])(
    'when given a non-integer string value with a zero-decimal-digit currency',
    (value: string) => {
      test('should throw an error', () => {
        expect(() => money(value, zeroDigitCurrency)).toThrow(
          new WrongInputError(
            `The input value, "${value}", is not an integer to match the currency's 0 decimal digits.`,
          ),
        );
      });
    },
  );

  describe.each([[''], ['test'], ['123'], ['-345666778'], ['abc123'], ['34.3456'], ['346576.2', '34.0']])(
    "when given a non-decimal string value or a decimal value that doesnt't match the currency's decimal digit count",
    (value: string) => {
      test('should throw an error', () => {
        expect(() => money(value, doubleDigitCurrency)).toThrow(
          new WrongInputError(
            `The input value, "${value}", is not a fixed decimal number to match the currency's 2 decimal digits.`,
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
        moneyObj = money(value, cur);
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
