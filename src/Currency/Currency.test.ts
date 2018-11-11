import { USD, GBP, EUR } from '../constants/ISO_CURRENCIES';
import Currency from '../Currency';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';
import WrongInputError from '../errors/WrongInputError';

jest.mock('../CurrencyStore/data', () => ({
  USD,
  GBP,
}));

describe('Currency', () => {

  test('can be initialized with the currency code of an already-registered currency', () => {
    const currency = new Currency('USD');
    expect(currency.settings).toEqual(USD);
  });

  test('can be initialized with another Currency instance', () => {
    const currency = new Currency('USD');
    const currency2 = new Currency(currency);
    expect(currency2.settings).toEqual(USD);
  });

  test('can be initialized directly with the currency settings', () => {
    const currency = new Currency(EUR);
    expect(currency.settings).toEqual(EUR);
  });

  describe('when partial settings are used', () => {
    describe('and the currency is not registered', () => {
      test('can be initialized with default built-in settings included', () => {
        const currency = new Currency({ code: 'EUR' });
        expect(currency.settings).toEqual({
          code: 'EUR',
          thousandsSeparator: ',',
          decimalSeparator: '.',
          decimalDigits: 2,
          pattern: '%ns%s%v',
          symbol: 'EUR',
          formatter: undefined,
          parser: undefined,
        });
      });
    });

    describe('and the currency is registered', () => {
      test('can be initialized with registered settings included', () => {
        const currency = new Currency({ code: 'GBP', thousandsSeparator: '-' });
        expect(currency.settings).toEqual({
          ...GBP,
          thousandsSeparator: '-',
        });
      });
    });
  });

  test('can be initialized with the static "init" factory function', () => {

    const currency = Currency.init('USD');
    expect(currency).toBeInstanceOf(Currency);
    expect(currency.settings).toEqual(USD);
  });

  describe('with valid values', () => {
    const currency = new Currency('USD');

    test('should return a frozen object', () => {
      expect(Object.isFrozen(currency)).toBe(true);
    });

    describe('"is"', () => {
      describe('when given the same currency with the exact same settings', () => {
        test('should return true', () => {
          expect(currency.is('USD')).toBe(true);
          expect(currency.is(new Currency('USD'))).toBe(true);
        });
      });

      describe('when given a different currency', () => {
        test('should return false', () => {
          expect(currency.is('GBP')).toBe(false);
          expect(currency.is(new Currency('GBP'))).toBe(false);
        });
      });

      describe('when given the same currency with different settings', () => {
        test('should return false', () => {
          const customUSD = new Currency({
            ...currency.settings,
            symbol: 'US$',
          });
          expect(currency.is(customUSD)).toBe(false);
        });
      });
    });

    test('"toString()" should return the code', () => {
      expect(currency.toString()).toBe('USD');
    });

    test('"toJSON()" should return the code', () => {
      expect(currency.toJSON()).toBe('USD');
    });

    test(
      '"clone()" should return a new instance of the Currency class with the same settings',
      () => {
        const clonedCurency = currency.clone();
        expect(clonedCurency).toBeInstanceOf(Currency);
        expect(clonedCurency).not.toBe(currency);
        expect(currency.is(clonedCurency)).toBe(true);
      },
    );

    test('"settings" getter should return the settings', () => {
      expect(currency.settings).toEqual({
        ...USD,
        formatter: undefined,
        parser: undefined,
      });
    });
  });

  describe('when given any invalid or missing code as part of input settings', () => {
    const invalidCurrencyCodes: any[] = [
      undefined,
      null,
      false,
      true,
      '',
      123,
      {},
      [],
    ];

    test('"constructor" should throw an error', () => {
      for (const invalidCurrencyCode of invalidCurrencyCodes) {
        expect(() => new Currency({ code: invalidCurrencyCode as unknown as string }))
          .toThrow(new InvalidCurrencyError('Invalid currency settings; code is required.'));
      }
    });
  });

  describe('when given any invalid input', () => {
    const invalidCurrencyInputs: any[] = [
      undefined,
      null,
      false,
      true,
      '',
      123,
      [],
    ];

    test('"constructor" should throw an error', () => {
      for (const invalidCurrencyInput of invalidCurrencyInputs) {
        expect(() => new Currency(invalidCurrencyInput as unknown as string))
          .toThrow(new WrongInputError('Invalid currency provided.'));
      }
    });
  });
});
