import {
  register,
  registerMultiple,
  isRegistered,
  deregister,
  get,
  getAll,
} from '.';
import { USD, GBP, EUR } from '../constants/ISO_CURRENCIES';
import getDefaultSettings from '../Currency/getDefaultSettings';
import * as assertCurrencyCodeModule from './internals/assertCurrencyCode';
import { InvalidCurrencyError } from '../errors';

let mockData = {};

jest.mock('./internals/getData', () => () => mockData);

describe('CurrencyStore', () => {

  let assertCurrencyCodeSpy: any;

  beforeAll(() => {
    assertCurrencyCodeSpy = jest.spyOn(assertCurrencyCodeModule, 'default');
  });

  afterAll(() => {
    assertCurrencyCodeSpy.mockRestore();
  });

  afterEach(() => {
    mockData = {};
  });

  describe('methods', () => {
    describe('register', () => {
      test('should add a currency to the store as a frozen object', () => {
        expect(mockData).toEqual({});

        register(USD);
        expect(assertCurrencyCodeSpy).toHaveBeenLastCalledWith('USD');

        expect(mockData).toEqual({
          USD,
        });

        expect(Object.isFrozen(mockData['USD'])).toBe(true);
      });

      test('should add multiple currencies when called with different currencies', () => {
        expect(mockData).toEqual({});

        register(USD);

        expect(assertCurrencyCodeSpy).toHaveBeenLastCalledWith('USD');

        register(GBP);

        expect(assertCurrencyCodeSpy).toHaveBeenLastCalledWith('GBP');

        expect(mockData).toEqual({
          USD,
          GBP,
        });
      });

      test('should replace a currency in the store with the same code', () => {
        expect(mockData).toEqual({});

        register(USD);

        expect(mockData).toEqual({
          USD,
        });

        register({
          ...USD,
          symbol: 'US$',
        });

        expect(mockData).toEqual({
          USD: {
            ...USD,
            symbol: 'US$',
          },
        });
      });

      test('should use the default built-in settings with partial input settings', () => {
        expect(mockData).toEqual({});

        register({
          code: 'EUR',
        });

        expect(assertCurrencyCodeSpy).toHaveBeenLastCalledWith('EUR');

        expect(mockData).toEqual({
          EUR: getDefaultSettings('EUR'),
        });
      });

      test('should use the provided settings', () => {
        expect(mockData).toEqual({});

        const EUR = {
          code: 'EUR',
          symbol: '€',
          thousandsSeparator: ' ',
          decimalSeparator: ',',
          decimalDigits: 2,
          pattern: '%ns%v %s',
        };

        register(EUR);

        expect(assertCurrencyCodeSpy).toHaveBeenLastCalledWith('EUR');

        expect(mockData).toEqual({
          EUR,
        });
      });
    });

    test('registerMultiple should be able to add multiple currencies provided as a list', () => {
      const currencies = [
        USD,
        GBP,
      ];

      expect(mockData).toEqual({});

      registerMultiple(currencies);

      expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('USD');
      expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('GBP');

      expect(mockData).toEqual({
        USD,
        GBP,
      });
    });

    describe('isRegistered', () => {
      beforeEach(() => {
        register(USD);
        register(GBP);
        assertCurrencyCodeSpy.mockClear();
      });

      describe('when given a registered currency', () => {
        test('should return true', () => {
          expect(isRegistered('USD')).toBe(true);
          expect(isRegistered('GBP')).toBe(true);

          expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('USD');
          expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('GBP');
        });
      });

      describe('when given a non-registered currency', () => {
        test('should return false', () => {
          expect(isRegistered('EUR')).toBe(false);
          expect(isRegistered('JPY')).toBe(false);

          expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('EUR');
          expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('JPY');
        });
      });
    });
  });

  describe('deregister', () => {
    beforeEach(() => {
      register(USD);
      register(GBP);
      assertCurrencyCodeSpy.mockClear();
    });

    describe('when given a registered currency', () => {
      test('should return true and delete the currency', () => {
        expect(mockData).toEqual({
          USD,
          GBP,
        });
        expect(deregister('USD')).toBe(true);
        expect(deregister('GBP')).toBe(true);
        expect(mockData).toEqual({});

        expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('USD');
        expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('GBP');
      });
    });

    describe('when given a non-registered currency', () => {
      test('should still return true', () => {
        expect(mockData).toEqual({
          USD,
          GBP,
        });
        expect(deregister('EUR')).toBe(true);
        expect(deregister('JPY')).toBe(true);
        expect(mockData).toEqual({
          USD,
          GBP,
        });

        expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('EUR');
        expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('JPY');
      });
    });
  });

  describe('get', () => {
    beforeEach(() => {
      register(USD);
      register(GBP);
      assertCurrencyCodeSpy.mockClear();
    });

    describe('when given a registered currency', () => {
      test('should return the currency', () => {
        expect(get('USD')).toEqual(USD);
        expect(get('GBP')).toEqual(GBP);

        expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('USD');
        expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('GBP');
      });
    });

    describe('when given a non-registered currency', () => {
      test('should throw an error', () => {
        expect(() => get('EUR'))
          .toThrow(new InvalidCurrencyError('No currency with code "EUR" is registered.'));
        expect(() => get('JPY'))
          .toThrow(new InvalidCurrencyError('No currency with code "JPY" is registered.'));

        expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('EUR');
        expect(assertCurrencyCodeSpy).toHaveBeenCalledWith('JPY');
      });
    });
  });

  test('getAll should return the registered currencies in alphabetical order', () => {
    register(USD);
    register(EUR);
    register(GBP);
    expect(getAll())
      .toEqual([
        EUR,
        GBP,
        USD,
      ]);
  });
});
