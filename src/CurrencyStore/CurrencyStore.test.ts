import {
  register,
  registerMultiple,
  isRegistered,
  deregister,
  get,
  getAll,
} from '.';
import { USD, GBP } from '../constants/ISO_CURRENCIES';
import getDefaultSettings from '../Currency/getDefaultSettings';
import { WrongInputError, InvalidCurrencyError } from '../errors';

let mockData = {};

jest.mock('./data', () => () => mockData);

describe('CurrencyStore', () => {

  afterEach(() => {
    mockData = {};
  });

  describe('"methods"', () => {
    describe('"register"', () => {
      test('should add a currency to the store as a frozen object', () => {
        expect(mockData).toEqual({});
        register(USD);
        expect(mockData).toEqual({
          USD,
        });
        expect(Object.isFrozen(mockData['USD'])).toBe(true);
      });

      test('should add multiple currencies when called with different currencies', () => {
        expect(mockData).toEqual({});
        register(USD);
        register(GBP);
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

        expect(mockData).toEqual({
          EUR,
        });
      });

      describe('when given a code that is not a truthy string', () => {
        const invalidInputs = [
          undefined,
          null,
          '',
          123,
          true,
          false,
          {},
          [],
        ];

        test(
          'should throw an error',
          () => {
            expect(mockData).toEqual({});

            for (const invalidInput of invalidInputs) {
              expect(() => register({
                ...USD,
                code: invalidInput as string,
              })).toThrow(new InvalidCurrencyError('Invalid currency settings; code is required.'));
            }
          },
        );
      });

      describe('when given a code that is not upper-case or has leading or trailing spaces', () => {
        test(
          'should throw an error',
          () => {
            expect(mockData).toEqual({});

            expect(() => register({
              ...USD,
              code: 'usd',
            })).toThrow(new WrongInputError(
              'Currency code must be uppercase and contain no leading or trailing spaces'
            ));

            expect(() => register({
              ...USD,
              code: '  USD  ',
              symbol: 'US$',
            })).toThrow(new WrongInputError(
              'Currency code must be uppercase and contain no leading or trailing spaces'
            ));

            expect(mockData).toEqual({});
          },
        );
      });
    });
  });
});
