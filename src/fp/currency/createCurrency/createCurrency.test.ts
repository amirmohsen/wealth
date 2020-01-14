import { InvalidCurrencyError } from 'src/shared/errors';
import { FrozenBaseCurrency } from 'src/fp/types';
import currency from '.';

describe('createCurrency', () => {
  describe.each([[false], [true], [null], [undefined], [{}], [[]], ['']] as any[][])(
    'when given an invalid currency code',
    (value: any) => {
      test('should throw an error', () => {
        expect(() => currency(value)).toThrow(new InvalidCurrencyError('Currency code is required.'));
      });
    },
  );

  describe('when given a currency code that does not match the one in the settings', () => {
    test('should throw an error', () => {
      expect(() => currency('USD', { code: 'GBP' })).toThrow(
        new InvalidCurrencyError('Currency code does not match the settings code.'),
      );
    });
  });

  describe('given a correct currency input', () => {
    describe('and no settings', () => {
      let USD: FrozenBaseCurrency;

      beforeAll(() => {
        USD = currency('USD');
      });

      test('should create a currency using the default settings', () => {
        expect(USD).toMatchInlineSnapshot(`
            Object {
              "$$typeof": Symbol(wealth.currency),
              "code": "USD",
              "decimalDigits": 2,
              "decimalSeparator": ".",
              "pattern": "%ns%s%v",
              "symbol": "USD",
              "thousandsSeparator": ",",
            }
        `);
      });

      test('should create a currency that is frozen', () => {
        expect(Object.isFrozen(USD)).toBe(true);
      });
    });

    describe('and some settings', () => {
      let USD: FrozenBaseCurrency;

      beforeAll(() => {
        USD = currency('USD', {
          symbol: '$',
        });
      });

      test('should create a currency by merging the provided settings with the default ones', () => {
        expect(USD).toMatchInlineSnapshot(`
          Object {
            "$$typeof": Symbol(wealth.currency),
            "code": "USD",
            "decimalDigits": 2,
            "decimalSeparator": ".",
            "pattern": "%ns%s%v",
            "symbol": "$",
            "thousandsSeparator": ",",
          }
        `);
      });

      test('should create a currency that is frozen', () => {
        expect(Object.isFrozen(USD)).toBe(true);
      });
    });
  });
});
