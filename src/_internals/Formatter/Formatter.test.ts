import Money from '../Money';
import { USD, GBP, EUR, OMR, JPY } from '../constants/ISO_CURRENCIES';
import {
  format,
} from '.';

jest.mock('../CurrencyStore/internals/getData', () => () => ({
  USD,
  GBP,
  EUR,
  OMR,
  JPY,
}));

describe('Formatter', () => {

  describe('format', () => {
    const currencies = [
      'USD',
      'GBP',
      'EUR',
      'OMR',
      'JPY',
    ];

    const values = [
      '100.00',
      '54.42',
      '-120.99',
      '1200145154.42',
    ];

    for (const currency of currencies) {
      describe(`with "${currency}"`, () => {
        for (const value of values) {
          const	money = new Money(value, currency);
          test(`should format ${currency} ${value} correctly`, () => {
            expect(format(money)).toMatchSnapshot();
          });
        }
      });
    }
  });
});
