import { oneLine } from 'common-tags';
import assertCurrencyCode from '.';
import { WrongInputError } from '../../../errors';

describe('assertCurrencyCode', () => {
  describe('when given valid values', () => {
    const validValues = ['USD', 'GBP', 'RANDOM', 'AB', 'C', '123'];

    test('should do nothing', () => {
      for (const validValue of validValues) {
        expect(assertCurrencyCode(validValue)).toBeUndefined();
      }
    });
  });

  describe('when given invalid values', () => {
    const invalidValues = [
      '',
      ' ',
      ' USD',
      'USD ',
      ' GBP ',
      'eur',
      'euR',
      false,
      true,
      0,
      123,
      undefined,
      null,
      {},
      [],
    ];

    test('should throw an error', () => {
      for (const invalidValue of invalidValues) {
        expect(() => assertCurrencyCode(invalidValue as string)).toThrow(
          new WrongInputError(
            oneLine`
              Currency code must be a non-empty,
              uppercase string with contain no leading or trailing spaces
            `,
          ),
        );
      }
    });
  });
});
