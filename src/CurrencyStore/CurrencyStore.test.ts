import {
  register,
  registerMultiple,
  isRegistered,
  deregister,
  get,
  getAll,
} from '.';
import { USD } from '../constants/ISO_CURRENCIES';

let mockData = {};

jest.mock('./data', () => () => mockData);

describe('CurrencyStore', () => {

  afterEach(() => {
    mockData = {};
  });

  describe('"methods"', () => {
    describe('"register"', () => {
      test('should add a currency to the store', () => {
        expect(mockData).toEqual({});
        register('USD', USD);
        expect(mockData).toEqual({
          USD,
        });
      });

      test('should replace a currency in the store with the same code', () => {
        expect(mockData).toEqual({});
        register('USD', USD);
        expect(mockData).toEqual({
          USD,
        });
      });
    });
  });
});
